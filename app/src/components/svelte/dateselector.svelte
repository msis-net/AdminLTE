<script>
	import { currentDate } from '@/store/userStore' 
	import { format } from "date-fns";
	let date = $currentDate
	
	//https://learn.svelte.jp/tutorial/writable-stores
	//storeはsubscribe メソッドを備えたオブジェクトにする事で他コンポーネントからの変更を検知できる
	currentDate.subscribe((value) => {
		date = value;
	});
	
	//console.log("date",date )
	const changeDate = (event) => {
		//console.log("index:event",new Date(event.target.value) )
		if(!event.target.value){
			date = $currentDate
			console.log("削除はできません。")
		}else{
			const ymd = format(new Date(event.target.value) , 'yyyy-MM-dd')
			$currentDate=ymd
		}
	}

	const inputStyle = {
		border: "solid 0px #999",
		borderRadius:'var(--dp-border-radius, 5px)',
		padding:'0.1em',
		lineHeight: '2.15rem',
		fontSize: '1.6em',
	};
</script>

<input 
      type="date" 
      style={inputStyle}
      bind:value={date} 
      on:change={changeDate}
    />

<style>
	input {
		border: "solid 0px #999";
		border-radius:'var(--dp-border-radius, 5px)';
		padding:0.2em;
		line-height: 2.15rem;
		font-size: 1.6em;
	}
</style>