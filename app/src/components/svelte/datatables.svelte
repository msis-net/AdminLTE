<script>
    import Grid from "gridjs-svelte";
    import "gridjs/dist/theme/mermaid.css";
    import "./main.css";
    const data = [
        { id: 9, name: "Denzel", age: 24, city: "Newcastle" },
        { id: 12, name: "Olga", age: 35, city: "Las Cruces" },
        { id: 13, name: "Barry", age: 27, city: "Newport" },
        { id: 10, name: "Anthony", age: 47, city: "Los Banos" },
        { id: 2, name: "Mary", age: 45, city: "Los Angeles" },
        { id: 1, name: "John", age: 21, city: "New York" },
        { id: 3, name: "Mark", age: 23, city: "Boston" },
        { id: 5, name: "Brian", age: 22, city: "New Orleans" },
        { id: 14, name: "Larry", age: 41, city: "Los Altos" },
        { id: 4, name: "Cris", age: 32, city: "Las Vegas" },
        { id: 6, name: "Stuart", age: 46, city: "Los Gatos" },
        { id: 7, name: "Owen", age: 24, city: "Boston" },
        { id: 8, name: "Paul", age: 33, city: "Las Vegas" },
        { id: 11, name: "Fred", age: 25, city: "Boston" },
        { id: 15, name: "Richard", age: 29, city: "Boston" },
        { id: 16, name: "Bruna", age: 31, city: "Las Vegas" },
    ];
    const style ={
        table: {
            border: '0px solid #ccc',
        },
        th: {
            padding: '0.2em'
        },
        td: {
            padding: '0.2em',
            fontSize: '1.0em'
        },
        footer:{
            height: '60px'
        }
    }

    const pagination ={
        limit: 10,
        summary: true
    }

    const columns =[
        {
            name: "id",
            sort: true,
        },
        {
            id:"name",
            name: "名前",
            sort: true,
        },
        {
            id:"age",
            name: "年齢",
            data: (row) => `${row.age} 歳`,
            width:'60px',
            sort: true,
        },
        {
            name: "city",
            sort: true,
        },
        {
            name: "city",
            formatter: (cell) => `Name: ${cell}`,
            sort: true,
        },
        { 
            name: 'Sum',
            data: null,
            formatter: (_, row) => `$${(row.cells[0].data + row.cells[2].data).toLocaleString()} USD`
        },
    ]


</script>

<Grid
    search="true"
    sort="true"
    resizable="false"
    fixedHeader="true"
    {columns}
    {pagination}
    {style}
    {data}
/>

