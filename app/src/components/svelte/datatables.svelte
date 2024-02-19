<script lang="ts">
    import { onMount } from 'svelte';
    import { DataHandler, Datatable, Th, ThFilter  } from "@vincjo/datatables";

    let myData ;
    
    const handler = new DataHandler(myData , {
        rowsPerPage: 10,
        i18n: {
            search: "検索",
            show: "表示",
            entries: "件",
            filter: "絞込み検索",
            rowCount: "開始 {start} 終了 {end} / {total}",
            noRows: "Aucun résultat",
            previous: "＜前項",
            next: "次項＞",
        },
    });
   
    const rows = handler.getRows();

    //const sort = handler.getSort()
    //handler.sortDesc('id')
    //handler.sortAsc('id')

    const SelectRow = (arg:[]) => {
        console.log("arg",arg)
    }

    onMount(() => {
		get_data()
	});

    async function get_data() {
        const jsonfile = `data.json`;
        console.log("jsonfile",jsonfile)
        await fetch(jsonfile) //読込
            .then(response => response.json())
            .then(result => {
                console.log("xresult",result)
                handler.setRows(result.data)
            })
    }
</script>

<svelte:head>
    <!--link
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
		rel="stylesheet"
		integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
		crossorigin="anonymous"
	/-->
    <style>
        /*検索*/
        header input.svelte-ykkz3r{
            font-size: 1.0em;
            padding:10px;
            height:36px;
        }
    </style>
</svelte:head>



<Datatable {handler}
    search={true} 
    rowsPerPage={true} 
    rowCount={true} 
    pagination={true}
    >
    
    <table>
        <thead>
            <tr>
                <Th {handler} orderBy="Id">Id</Th>
                <Th {handler} orderBy="Name">Name</Th>
                <Th {handler} orderBy="Position">Position</Th>
                <Th {handler} orderBy="Salary">Salary</Th>
                <Th {handler} orderBy="Start_date">Start_date</Th>
                <Th {handler} orderBy="Office">Office</Th>
                <Th {handler} orderBy="Extn">Extn</Th>
            </tr>
            
            <tr>
                <ThFilter {handler} filterBy="id" />
                <ThFilter {handler} filterBy="name"/>
                <ThFilter {handler} filterBy="position" />
                <ThFilter {handler} filterBy="salary" />
                <ThFilter {handler} filterBy="start_date" />
                <ThFilter {handler} filterBy="office" />
                <ThFilter {handler} filterBy="extn" />
            </tr>
        </thead>
        <tbody>
            {#each $rows as row}
                <tr>
                    <td on:click={() => SelectRow(row.id)} >{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.position}</td>
                    <td>{row.salary}</td>
                    <td>{row.start_date}</td>
                    <td>{row.office}</td>
                    <td>{row.extn}</td>
                </tr>
            {/each}
        </tbody>
    </table>
    
</Datatable>


<style>
    thead {
        background: #fff;
    }
    tbody td {
        border: 1px solid #f5f5f5;
        padding: 4px 20px;
        white-space: nowrap;
    }
    tbody tr {
        transition: all, 0.2s;
    }
    
    /*偶数行ごとに色分け*/
    table tr:nth-child(even) td {
        /*border-top: 1px solid #ccc;*/

        background-color: #eee;
    }
</style>
