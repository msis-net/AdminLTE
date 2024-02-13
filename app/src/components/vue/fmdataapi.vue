<script setup lang="ts">
const props = defineProps({
    ptid: String,
    name: String
})

import { ref, onMounted, onUpdated, watch  } from 'vue';

//コンポーネント間で共有する日付データ
import { useStore } from '@nanostores/vue';
import { currentDate, valData } from '@/store/userStore' 
const date = ref(useStore(currentDate))
const values = useStore(valData)
console.log("date"+JSON.stringify(date.value))

console.log("values"+JSON.stringify(values.value))
import dayjs from "dayjs";
dayjs.locale("ja");

//apiparam
const fm_host ="https://127.0.0.1"
const fm_database = "db_eve"
const fm_user = "admin"
const fm_password = "admin"
const fm_script = "upPtinfo"
const param = '{"ptid":"'+props.ptid+'",\"script\":"'+fm_script+'"}'

//初回読み込み時はsrynaiyo値一覧の読込が必要な為、sessionStrage.jsonを先に読み込んでからget_dataを実行
async function app_init() {
  const url_1 = fm_host+'/fmi/data/vLatest/databases/'+fm_database+'/sessions'
  const basic_auth = "Basic " + btoa(`${fm_user}:${fm_password}`)
  console.log("url_1",url_1)
  await fetch(fm_host, {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Basic " + btoa(`${fm_user}:${fm_password}`)
    }
  }).then(response => response.json())
  .then(result => {
    console.log("result",result)
  });
  
    
  //get_data()
}
/*

*/
//受付リスト読みこみ
async function get_data() {
  const yyyy = dayjs(date.value).format('YYYY')
  const yyyymmdd = dayjs(date.value).format('YYYYMMDD')
  const jsonfile = `./orca/acceptlstv2/${yyyy}/acceptlstv2_${yyyymmdd}.json`;
  console.log(jsonfile, yyyy, yyyymmdd)
  await fetch(jsonfile) //読込
    .then(response => response.json())
    .then(result => {
      try{
        console.log(result)
      
      }catch(e){
        //error handringが必要な場合はここに記録
      }
    });
}



onMounted(() => {
  //console.log("onMounted")
  app_init()
})
onUpdated(() => {
  //console.log("onUpdated")
  //get_data("")
})

//日付に変更が発生した場合リスト更新
watch(() => date.value, () => {
  console.log("watch:date", date.value)
  get_data()
})



</script>

<template>
<div class="test">これはテストです。{{ ptid }}</div>
</template>

<style>

</style>
