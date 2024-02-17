<script>
  import { onMount } from 'svelte';
  import { currentDate } from '@/store/userStore' 
	import { format } from "date-fns";

  import Grid from "gridjs-svelte";
  import "gridjs/dist/theme/mermaid.css";
  import "./main.css";

  let date = $currentDate
  
  currentDate.subscribe((value) => {
		date = value;
	});

  onMount(async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    console.log(data);
  });
  

  let data = [
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
  const style = {
    table: {
      border: "0px solid #ccc",
    },
    th: {
      padding: "0.2em",
    },
    td: {
      padding: "0.2em",
      fontSize: "1.0em",
    },
    footer: {
      height: "60px",
    },
  };

  const pagination = {
    limit: 10,
    summary: true,
  };

  const columns = [
    {
      name: "id",
      sort: true,
    },
    {
      id: "name",
      name: "名前",
      sort: true,
    },
    {
      id: "age",
      name: "年齢",
      data: (row) => `${row.age} 歳`,
      width: "60px",
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
      name: "Sum",
      data: null,
      formatter: (_, row) =>
        `$${(row.cells[0].data + row.cells[2].data).toLocaleString()} USD`,
    },
  ];
  

  

  $:  {
    //日付変更
    const ymd = format(new Date(date) , 'yyyy-MM-dd')
    console.log("ymd",ymd)

    const yyyy = format(ymd , 'yyyy')
    const yyyymmdd = format(ymd , 'yyyyMMdd')
    const jsonfile = `./orca/acceptlstv2/${yyyy}/acceptlstv2_20240201.json`;
    //const jsonfile = `./orca/acceptlstv2/${yyyy}/acceptlstv2_${yyyymmdd}.json`;
    console.log("jsonfile",jsonfile)
    geyListData(jsonfile)

    
    /*
    data = [
    { id: 9, name: "Denzel", age: 24, city: "Newcastle" },
    { id: 12, name: "Olga", age: 35, city: "Las Cruces" },
    ]*/
  }

  async function geyListData(jsonfile) {
    console.log("geyListData",jsonfile)
    await fetch(jsonfile) //読込
    .then(response => response.json())
    .then(result => {
      console.log(result)
    })
  }
</script>

<div>{date}</div>
<div class="row">
  <div class="col-12 col-sm-6 col-md-3">
    <div class="info-box">
      <span class="info-box-icon text-bg-primary shadow-sm">
        <i class="bi bi-people-fill"></i>
      </span>
      <div class="info-box-content">
        <span class="info-box-text">本日</span>
        <span class="info-box-number"></span>
      </div>
      <!-- /.info-box-content -->
    </div>
    <!-- /.info-box -->
  </div>
  <!-- /.col -->

  <div class="col-12 col-sm-6 col-md-3">
    <div class="info-box">
      <span class="info-box-icon text-bg-success shadow-sm">
        <i class="bi bi-people"></i>
      </span>
      <div class="info-box-content">
        <span class="info-box-text">現在</span>
        <span class="info-box-number"></span>
      </div>
      <!-- /.info-box-content -->
    </div>
    <!-- /.info-box -->
  </div>
  <!-- /.col -->

  <div class="col-12 col-sm-6 col-md-3">
    <div class="info-box">
      <span class="info-box-icon text-bg-warning shadow-sm">
        <i class="bi bi-person-check-fill"></i>
      </span>
      <div class="info-box-content">
        <span class="info-box-text">会計済み</span>
        <span class="info-box-number"></span>
      </div>
      <!-- /.info-box-content -->
    </div>
    <!-- /.info-box -->
  </div>
  <!-- /.col -->

  <div class="col-12 col-sm-6 col-md-3">
    <div class="info-box">
      <span class="info-box-icon text-bg-danger shadow-sm">
        <i class="bi bi-person-check-fill"></i>
      </span>
      <div class="info-box-content">
        <span class="info-box-text">その他</span>
        <span class="info-box-number">0</span>
      </div>
      <!-- /.info-box-content -->
    </div>
    <!-- /.info-box -->
  </div>
  <!-- /.col -->
</div>
<!--<div>{{ date }}</div> /.確認用 -->
<div class="row">
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
</div>
