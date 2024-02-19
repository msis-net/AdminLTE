<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
DataTable.use(DataTablesCore);
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-responsive';
import 'datatables.net-select';

onMounted(() => {
  //console.log("onMounted")
  get_data()
})

const data = ref([]);

async function get_data() {
    const jsonfile = `data.json`;
  //console.log(jsonfile, yyyy, yyyymmdd)
  await fetch(jsonfile) //読込
    .then(response => response.json())
    .then(result => {
      //console.log("result",result)
      data.value = result.data
    })

}

const onselect = (event: any, chartContext: any, config: any) => {
  console.log("event", event)
  console.log("chartContext", chartContext)
  console.log("config", config)
}

const columns = [
  { data: 'id' },
  { data: 'name' },
  { data: 'position' },
  { data: 'salary' },
  { data: 'start_date' },
  { data: 'office' },
  { data: 'extn' }
]
const options = {
  //dom: 'Bfrtip',
  buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
  /*dom: 'Bfrtip',
        buttons: [
            {
                text: 'My button',
                action: function ( e, dt, node, config ) {
                    console.log(e)
                    console.log(dt)
                    console.log(node)
                    console.log(config)
                }
            }
        ],*/
  responsive: true,
  select: true,
  searching: true,
  ordering: false,
  lengthMenu: [10,20 ,50, 100],
};
</script>
<template>
    <div class="row">
    <DataTable
      :columns="columns"
      :options="options"
      :data="data"
      @click = "onselect"
      class="display nowrap"
      width="100%"
    >
    <thead>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>position</th>
        <th>salary</th>
        <th>start_date</th>
        <th>office</th>
        <th>extn</th>
      </tr>
    </thead>
    </DataTable>
  </div>
</template>

<style>
@import 'datatables.net-dt';
@import 'datatables.net-responsive-dt';

/*対象データ無い時は表示を消す*/
.dataTables_empty {
  display: none;
}

tfoot input {
        width: 100%;
        padding: 3px;
        box-sizing: border-box;
    }
</style>