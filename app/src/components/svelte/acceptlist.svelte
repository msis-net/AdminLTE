<script>
  import { onMount } from "svelte"
  import { currentDate, valData } from "@/store/userStore"
  import { format, formatDuration, intervalToDuration } from "date-fns"

  import Grid from "gridjs-svelte"
  import "gridjs/dist/theme/mermaid.css"
  import "./main.css"

  let date = $currentDate
  let valdata = $valData
  
  let counter = {
    now: 0,
    today: 0,
    endof: 0,
    other: 0,
  }
  currentDate.subscribe((value) => {
    date = value;
  });

  valData.subscribe((value) => {
    valdata = value;
  });

  app_init()

  onMount(async () => {
    
  });

  let data = []

  const style = {
    table: {
      border: "0px solid #ccc",
    },
    th: {
      padding: "0.2em",
      fontSize: "0.8em",
    },
    td: {
      padding: "0.2em",
      fontSize: "0.9em",
      whiteSpace: "nowrap",
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
      id: "Acceptance_Id",
      name: "No",
      data: (row) => `${Number(row.Acceptance_Id)}`,
      sort: true,
    },
    {
      id: "Acceptance_Time",
      name: "受付時間",
      sort: true,
    },
    {
      id: "Patient_ID",
      name: "患者番号",
      data: (row) => `${Number(row.Patient_Information.Patient_ID)}`,
      sort: true,
    },
    {
      id: "WholeName",
      name: "患者氏名",
      data: (row) => `${row.Patient_Information.WholeName}`,
      sort: true,
    },
    {
      id: "Sex",
      name: "性",
      data: (row) => {
        if (row.Patient_Information.Sex === "1") {
          return "男"
        } else if (row.Patient_Information.Sex === "2") {
          return "女"
        } else {
          return "不明"
        }
      },
      sort: true,
    },
    {
      id: "age",
      name: "年齢",
      data: (row) =>{ 
        try{
          return `${calcAge(row.Patient_Information.BirthDate, date )} 歳`
        } catch(e){
          return "-"
        } 

      },
      width: "60px",
      sort: true,
    },
    {
      id: "department",
      name: "診療科",
      data: (row) =>{ 
        return row.Department_Code+" "+row.Department_WholeName
      },
      sort: true,
    },
    {
      id: "Physician_WholeName",
      name: "ドクター",
      data: (row) =>{
        return row.Physician_WholeName
      },
      sort: true,
    },
    {
      id: "Medical_Information",
      name: "診療内容",
      data: (row) =>{
        const vSrynaiyo = valdata.vSrynaiyo
        const srynaiyo = vSrynaiyo[row.Medical_Information]
        return row.Medical_Information+" "+srynaiyo
      },
      width: "160px",
      sort: true,
    },
    {
      id: "HealthInsurance_Information",
      name: "保険組合せ",
      data: (row) =>{
        const hkncmb = row.HealthInsurance_Information.Insurance_Combination_Number
        const hknname = row.HealthInsurance_Information.InsuranceProvider_WholeName
        let insname = ""
        const PublicInsurance_Information=row.PublicInsurance_Information
        for( var i in PublicInsurance_Information)
          insname += " "+PublicInsurance_Information[i].PublicInsurance_Name
        return hkncmb+" "+hknname+insname
      },
      sort: true,
    },
    {
      id: "Account_Time",
      name: "会計時刻",
      data: (row) => {
        if(row.Account_Time){
          return row.Account_Time
        }
      },
      sort: true,
    },
  ];

  $: {
    //日付変更
    data = []
    const ymd = format(new Date(date), "yyyy-MM-dd");
    console.log("ymd", ymd);
    geyListData(ymd)
  }
  
  async function app_init() {
    const envfile = `./orca/env/sessionStrage.json`
    await fetch(envfile)
      .then(response => response.json())
      .then(result => {
        //valData.set(result)
        console.log("result",result)
        valData.set(result)
      });
      
  }
  async function geyListData(ymd) {
    const yyyy = format(ymd, "yyyy");
    const yyyymmdd = format(ymd, "yyyyMMdd");
    //const jsonfile = `./orca/acceptlstv2/${yyyy}/acceptlstv2_20240125.json`;
    const jsonfile = `./orca/acceptlstv2/${yyyy}/acceptlstv2_${yyyymmdd}.json`
    console.log("geyListData", jsonfile);
    await fetch(jsonfile) //読込
      .then((response) => response.json())
      .then((result) => {
        const temp = result.Acceptlst_Information; //変数化
        //counter.value.today = Object.keys(temp).length;
        data = temp
        console.log(temp);
        
      })
  }

  function calcAge(stday , edday) {
    console.log(stday,edday)
    try{
      const start = new Date(stday)
      const end = new Date(edday)
      const duration = intervalToDuration({ start, end });
      console.log(duration)
      return duration.years
    }catch(e){
      return "-"
    }
    
  }

  const listUpdate =(type) =>{
    console.log("listUpdate",type)
  }
</script>

<div>{date}</div>
<div class="row">
  <div class="col-12 col-sm-6 col-md-3">
    <div class="info-box">
      <span class="info-box-icon text-bg-primary shadow-sm">
        <i class="bi bi-people-fill" on:click={() => listUpdate("today")}></i>
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
        <i class="bi bi-people" on:click={() => listUpdate("now")}></i>
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
        <i class="bi bi-person-check-fill" on:click={() => listUpdate("endof")}></i>
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
        <i class="bi bi-person-check-fill" on:click={() => listUpdate("other")}></i>
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
