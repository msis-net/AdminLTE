<script>
	import { vDate, vHospinf, vByoto, vSrynaiyo } from '@/store/userStore' 
	import { format } from "date-fns";
	let date = $vDate
	
	//https://learn.svelte.jp/tutorial/writable-stores
	//storeはsubscribe メソッドを備えたオブジェクトにする事で他コンポーネントからの変更を検知できる
	vDate.subscribe((value) => {
		date = value;
	});
	
	//ログインの確認と基本値の設定
	if(sessionStorage.isLoggin){
    	console.log("isLogin:True")
	}else{
		console.log("isLogin:False")
		const envfile = `./orca/env/sessionStrage.json`
		fetch(envfile)
		.then(async (response) => response.json())
		.then((result) => {
			const ymd = format(new Date(), "yyyy-MM-dd")
			vDate.set(ymd)
			vByoto.set(	JSON.stringify(result.Byoto) )
			vHospinf.set( JSON.stringify(result.Hospinf)　)
			vSrynaiyo.set( JSON.stringify(result.Srynaiyo) )
			sessionStorage.setItem( "isLoggin" , String(new Date()) )
		})
		.catch((e) => {
			return console.log(e)
		})
	}
    
	//console.log("date",date )
	const changeDate = (event) => {
		//console.log("index:event",new Date(event.target.value) )
		if(!event.target.value){
			date = $vDate
			console.log("削除はできません。")
		}else{
			const ymd = format(new Date(event.target.value) , 'yyyy-MM-dd')
			$vDate=ymd
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