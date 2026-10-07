const days=[
{name:"Pazar",title:"PAZAR • HAZIRLIK GÜNÜ",desc:"Bugün VS puanlama günü değil. Pazartesi için hazırlık yap.",do:["Radar görevlerini yapabilirsin ancak ödüllerini toplama.","Haftalık kaynak ve hızlandırma planını kontrol et."],save:["Radar ödülleri → Pazartesi","İnşaat hızlandırmaları → Salı","Araştırma malzemeleri → Çarşamba","Kahraman geliştirme malzemeleri → Perşembe"],short:"Hazırlık • Radar biriktirme"},
{name:"Pazartesi",title:"1. GÜN • RADAR / GENEL GELİŞİM",desc:"Biriktirdiğin Radar ödüllerini değerlendir ve günün VS görevlerini kontrol et.",do:["Biriktirilmiş Radar görevlerinin ödüllerini topla.","Günün puan tablosunda yer alan gelişim görevlerini kontrol et."],save:["UR Kamyon ve Özel Operasyon → Salı","Araştırma ve Savaşçı Bileşeni → Çarşamba","Kahraman geliştirme malzemeleri → Perşembe"],short:"Radar • Genel gelişim"},
{name:"Salı",title:"2. GÜN • İNŞAAT / GELİŞİM",desc:"İnşaat ve gelişim kaynaklarını bugün değerlendir.",do:["Bina geliştirmelerini tamamla.","İnşaat hızlandırmalarını kullan.","UR Özel Operasyon ve UR Kamyon görevlerini kontrol et.","Hayatta Kalan işe alımlarını günün puan tablosuna göre yap."],save:["Radar ödülleri → Çarşamba","Kahraman geliştirme malzemeleri → Perşembe"],short:"İnşaat • Gelişim"},
{name:"Çarşamba",title:"3. GÜN • ARAŞTIRMA",desc:"Araştırma, Savaşçı Bileşeni ve Radar günü.",do:["Biriktirilmiş Radar ödüllerini topla.","Araştırma Verisi ve araştırma geliştirmelerini yap.","Savaşçı Bileşeni sandıklarını değerlendir."],save:["Kahraman geliştirme malzemeleri → Perşembe","Radar ve genel hazırlık kaynakları → Cuma"],short:"Araştırma • Savaşçı Bileşeni • Radar"},
{name:"Perşembe",title:"4. GÜN • KAHRAMAN GELİŞİMİ",desc:"Biriktirdiğin kahraman geliştirme kaynaklarını bugün değerlendir.",do:["Kahraman Parçalarını kullan.","Kahraman işe alımlarını yap.","Kahraman EXP ve Beceri EXP kitaplarını kullan."],save:["Radar ödülleri → Cuma","Araştırma ve genel hızlandırmalar → Cuma"],short:"Kahraman • Parça • İşe alım • EXP • Beceri"},
{name:"Cuma",title:"5. GÜN • TAM HAZIRLIK",desc:"Radar ve genel gelişim kaynaklarını değerlendir; Cumartesi sunucu savaşına hazırlan.",do:["Biriktirilmiş Radar ödüllerini topla.","Günün puan tablosundaki inşaat, araştırma ve asker geliştirme görevlerini kontrol et.","Cumartesi için kalkanını ve savaş hazırlığını kontrol et."],save:["Savaş için asker ve iyileştirme kaynakları → Cumartesi","Gereksiz fazla harcamaları sonraki haftaya sakla"],short:"Radar • Genel gelişim • Savaş hazırlığı"},
{name:"Cumartesi",title:"6. GÜN • SAVAŞ",desc:"Savaş ve oyuncular arası mücadele günü.",do:["Sunucu savaşı için kalkan ve birlik durumunu kontrol et.","Savaşa katılıyorsan yaralı kapasitesini takip et.","Çevrimdışı kalacaksan kalkanını açık tut."],save:["Gereksiz asker kaybından kaçın.","Pazar ve yeni hafta için kalan kaynaklarını koru."],short:"Savaş • Sunucu savaşı"}
];

const jsDayToIndex={0:0,1:1,2:2,3:3,4:4,5:5,6:6};
const now=new Date();
const todayIndex=jsDayToIndex[now.getDay()];
const today=days[todayIndex];

document.getElementById("date").textContent=`BUGÜN • ${today.name.toUpperCase()}`;
document.getElementById("dayTitle").textContent=today.title;
document.getElementById("dayDesc").textContent=today.desc;
document.getElementById("doList").innerHTML=today.do.map(x=>`<li>${x}</li>`).join("");
document.getElementById("saveList").innerHTML=today.save.map(x=>`<li>${x}</li>`).join("");

const warning=document.getElementById("serverWarWarning");

const week=document.getElementById("week");

function showDay(i){
  const d=days[i];
  warning.hidden=!(d.name==="Cuma" || d.name==="Cumartesi");
  document.getElementById("date").textContent=(i===todayIndex ? "BUGÜN • " : "")+d.name.toUpperCase();
  document.getElementById("dayTitle").textContent=d.title;
  document.getElementById("dayDesc").textContent=d.desc;
  document.getElementById("doList").innerHTML=d.do.map(x=>`<li>${x}</li>`).join("");
  document.getElementById("saveList").innerHTML=d.save.map(x=>`<li>${x}</li>`).join("");
  document.querySelectorAll(".wday").forEach((e,n)=>{
    e.classList.toggle("selected",n===i);
    e.classList.toggle("active",n===todayIndex);
  });
}

days.forEach((d,i)=>{
  const b=document.createElement("button");
  b.className="wday"+(i===todayIndex?" active selected":"");
  b.innerHTML=`<b>${d.name}</b><small>${d.short}</small>`;
  b.onclick=()=>showDay(i);
  week.appendChild(b);
});
showDay(todayIndex);
