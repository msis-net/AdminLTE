<script lang="ts">
  
  import { vDate, vSrynaiyo } from '@/store/userStore' 
  import { format, intervalToDuration } from "date-fns";

  import { DataHandler, Datatable, Th } from "@vincjo/datatables";

  let date = $vDate
  const Srynaiyo = JSON.parse($vSrynaiyo)
  let myData;
  let counter = {
    now: 0,
    today: 0,
    endof: 0,
    other: 0,
  };
  
  vDate.subscribe((value) => {
    date = value;
  });


  //console.log("counter", counter);
  
  const handler = new DataHandler(myData, {
    rowsPerPage: 10,
    i18n: {
      search: "検索",
      show: "表示",
      entries: "件",
      filter: "絞込み検索",
      rowCount: "{start} - {end} / {total}",
      noRows: "Aucun résultat",
      previous: "前",
      next: "次",
    },
  });

  const rows = handler.getRows();

  //const sort = handler.getSort()
  //handler.sortDesc('id')
  //handler.sortAsc('id')

  const SelectRow = (arg: []) => {
    console.log("arg", arg);
  };

  /*
  onMount(() => {
    const ymd = format(new Date(date), "yyyy-MM-dd");
    console.log("ymd", ymd);
    //get_data(ymd)
  });*/

  $: {
    //日付変更
    const ymd = format(new Date(date), "yyyy-MM-dd");
    //console.log("ymd", ymd);
    get_data(ymd);
  }

  async function get_data(ymd: any) {
    const yyyy = format(ymd, "yyyy");
    const yyyymmdd = format(ymd, "yyyyMMdd");
    const jsonfile = `./orca/acceptlstv2/${yyyy}/acceptlstv2_20240127.json`;
    //const jsonfile = `./orca/acceptlstv2/${yyyy}/acceptlstv2_${yyyymmdd}.json`
     console.log("jsonfile", jsonfile,yyyymmdd);

    await fetch(jsonfile) //読込
      .then((response) => response.json())
      .then((result) => {
        //console.log("xresult", result);
        handler.setRows(result.Acceptlst_Information);
      });
  }

  function Sex(sex: string) {
    if (sex === "1") {
      return "男";
    } else if (sex === "2") {
      return "女";
    } else {
      return "不明";
    }
  }

  function calcAge(stday: string, edday: string) {
    //console.log(stday, edday);
    try {
      const start = new Date(stday);
      const end = new Date(edday);
      const duration = intervalToDuration({ start, end });
      return duration.years;
    } catch (e) {
      return "-";
    }
  }

  function getSrynaiyo(Medical_Information: string) {
    return Srynaiyo[Medical_Information]
  }

  function Kohname(publicobj: [any]) {
    let name=""
    if(publicobj){
      for(var i in publicobj){
        name += publicobj[i].PublicInsurance_Name
      }
    }
    return name;
  }

  function Account(time:string){
    if(time){
      return time
    }else{
      return ""
    }
  }
</script>

<svelte:head>
  <style>
    /*検索*/
    header input.svelte-ykkz3r {
      font-size: 1em;
      padding: 10px;
      height: 36px;
    }
  </style>
</svelte:head>

<div class="row">
  <div class="col-12 col-sm-6 col-md-3">
    <div class="info-box">
      <span class="info-box-icon text-bg-primary shadow-sm">
        <i class="bi bi-people-fill"></i>
      </span>
      <div class="info-box-content">
        <span class="info-box-text">本日</span>
        <span class="info-box-number">{counter.today}</span>
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
        <span class="info-box-number">{counter.now}</span>
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
        <span class="info-box-number">{counter.endof}</span>
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
        <span class="info-box-number">{counter.other}</span>
      </div>
      <!-- /.info-box-content -->
    </div>
    <!-- /.info-box -->
  </div>
  <!-- /.col -->
</div>
<div class="row">
  <Datatable
    {handler}
    search={true}
    rowsPerPage={true}
    rowCount={true}
    pagination={true}
  >
    <table>
      <thead>
        <tr>
          <Th {handler} orderBy="Acceptance_Id">番号</Th>
          <Th {handler} orderBy="Acceptance_Time">受付時間</Th>
          <Th {handler} orderBy="Patient_Information">患者番号</Th>
          <Th {handler} orderBy="Patient_Information">患者氏名</Th>
          <Th {handler} orderBy="Start_date">性</Th>
          <Th {handler} orderBy="Patient_Information">年齢</Th>
          <Th {handler} orderBy="Physician_WholeName">ドクター</Th>
          <Th {handler} orderBy="Department_WholeName">診療科</Th>
          <Th {handler} orderBy="Office">内容</Th>
          <Th {handler} orderBy="Physician_WholeName">保険</Th>
          <Th {handler} orderBy="Office">会計</Th>
        </tr>
        <!--
            <tr>
                <ThFilter {handler} filterBy="Acceptance_Id" />
                <ThFilter {handler} filterBy="Acceptance_Time"/>
                <ThFilter {handler} filterBy="Patient_Information" />
                <ThFilter {handler} filterBy="Patient_Information" />
                <ThFilter {handler} filterBy="Patient_Information" />
                <ThFilter {handler} filterBy="BirthDate" />
                <ThFilter {handler} filterBy="Physician_WholeName" />
            </tr>
            -->
      </thead>
      <tbody>
        {#each $rows as row}
          <tr>
            <td on:click={() => SelectRow(row.id)}
              >{Number(row.Acceptance_Id)}</td
            >
            <td>{row.Acceptance_Time}</td>
            <td>{Number(row.Patient_Information.Patient_ID)}</td>
            <td>{row.Patient_Information.WholeName}</td>
            <td>{Sex(row.Patient_Information.Sex)}</td>
            <td>{calcAge(row.Patient_Information.BirthDate, date)}才</td>
            <td>{row.Physician_WholeName}</td>
            <td>{row.Department_Code} {row.Department_WholeName}</td>
            <td>{row.Medical_Information} {getSrynaiyo(row.Medical_Information)}</td>
            <td>
              {row.HealthInsurance_Information.Insurance_Combination_Number}
              {row.HealthInsurance_Information.InsuranceProvider_WholeName}
              {Kohname(row.PublicInsurance_Information)}
            </td>
            <td>{Account(row.Account_Time)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </Datatable>
</div>

<style>
  table {
    white-space: nowrap;
  }
  thead {
    background: #fff;
  }
  tbody td {
    border: 1px solid #f5f5f5;
    padding: 4px 20px;
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
