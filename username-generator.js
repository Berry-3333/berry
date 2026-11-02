(()=>{'use strict';
const beginnings=['luna','nexo','arion','mira','pixel','solis','vanta','kairo','ember','atlas','nova','zephyr','lyra','cobalt','terra','orion','briar','echo','velora','cedar','sora','talin','indigo','riven','marlow','aurora','nori','aero','quartz','selene','cielo','lumen','arbor','vireo','tessa','halo','onyx','solara','nexa','alden','river','cinder','sable','zeno','astral','flora','moss','dusk','fable','sierra'];
const endings=['forge','wave','craft','pixel','quest','pulse','muse','vault','glow','trail','byte','spark','frame','bloom','field','stride','scope','nest','horizon','mint','verse','haven','signal','cloud','arc','peak','light','story','loop','path','fox','code','play','notes','grid','flow','lane','crest','drive','studio','pilot','shift','logic','track','core','orbit','sky','beam','dream','flare'];
const max=1000000000;
function row(id,countryList,selectedCountry){const n=((Math.floor(Number(id))-1)%max+max)%max;const a=(n*37+11)%beginnings.length;const b=(Math.floor(n/50)*23+n*7+3)%endings.length;const style=(n+Math.floor(n/2500))%5;const first=beginnings[a],last=endings[b];let base;
switch(style){case 0:base=first+last;break;case 1:base=first+'.'+last;break;case 2:base=first+'_'+last;break;case 3:base=first[0].toUpperCase()+first.slice(1)+last[0].toUpperCase()+last.slice(1);break;default:base=first.slice(0,4)+last.slice(0,4);}
// The ID-based suffix guarantees distinct usernames for distinct IDs, including preview rows 1–10.
const username=base.slice(0,12)+'_'+(n+1).toString(36).padStart(6,'0');
const countries=Array.isArray(countryList)&&countryList.length?countryList:['Worldwide'];
const country=selectedCountry||countries[(n*67+Math.floor(n/17)*19+37)%countries.length];
return [Math.floor(Number(id)),country,username];}
window.ZhariefUsername={row,max};})();
