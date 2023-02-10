function make_problem(){
    //１小節分のリズムを作る
    let position=0;
    let long=[1,2,2,4,4,8];
    let problem=[];
    while(position<16){
        let num=Math.floor(Math.random()*long.length);
        if(position+long[num]>16){
            let number=parseInt(Number((16-position).toString(2).replace(/1/g,"0").replace(/^0/,"1")),2) ;
            problem.push(number);
            position+=number;
        }
        else {
            problem.push(long[num]);
            position+=long[num];
        }
    }
    //8分音符が連続していたらティティにする
    //確率で４分音符を４分休符にする
    for(let i=0;i<problem.length;i++){
        if(problem[i]==2&&problem[i+1]==2){
            problem=problem.filter((element,index)=>index!=i);
            problem[i]=22;
            i=0;
        }
        if(problem[i]==4){
            let dice=Math.floor(Math.random()*6);
            if(dice==0) problem[i]="4_1";
        }
    }
    //１箇所を空欄にする
    let boxnum=Math.floor(Math.random()*problem.length);
    let answer=problem[boxnum];
    problem[boxnum]="box";
    if(answer==22||answer=="4_1") answer=4;
    document.getElementById(`onpu${answer}`).setAttribute("onclick","correct()");

    const div=document.getElementById("onpu");
    div.innerHTML="";
    for(let i=0;i<problem.length;i++){
        let png=`<img src="./onpu${problem[i]}.png" height="80" class="onpu"`;
        if(problem[i]=="4_1") png+=`style="margin-top:1ch;"`;
        png+=`>`;
        div.insertAdjacentHTML("beforeend",png);
    }
}

function miss(){
    alert("ちがうよ");
}
function correct(){
    alert("せいかい！");
    make_problem();
}