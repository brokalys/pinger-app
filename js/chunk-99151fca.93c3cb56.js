(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-99151fca"],{1148:function(t,e,r){"use strict";var n=r("a691"),o=r("1d80");t.exports="".repeat||function(t){var e=String(o(this)),r="",a=n(t);if(a<0||a==1/0)throw RangeError("Wrong number of repetitions");for(;a>0;(a>>>=1)&&(e+=e))1&a&&(r+=e);return r}},"408a":function(t,e,r){var n=r("c6b6");t.exports=function(t){if("number"!=typeof t&&"Number"!=n(t))throw TypeError("Incorrect invocation");return+t}},"6ba0":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("gmap-map",{ref:"map",staticStyle:{width:"100%",height:"300px"},attrs:{options:{zoomControl:!0,mapTypeControl:!1,scaleControl:!1,streetViewControl:!1,rotateControl:!1,fullscreenControl:!1},center:t.center,zoom:10}},[r("gmap-polygon",{ref:"polygon",attrs:{paths:t.paths,editable:!0},on:{paths_changed:function(e){return t.updateEdited(e)},rightclick:t.handleClickForDelete}})],1)},o=[],a=(r("b680"),r("755e")),i={name:"GoogleMap",created(){try{Object(a["loadGmapApi"])({key:"AIzaSyADke6h-GKt5dPB8IcjVeQ0lAaC1wL_LwY"})}catch(t){}},data(){return{center:{lat:56.98,lng:24.105078},paths:[[{lng:24.1366192486729,lat:56.9922942350075},{lng:23.995789971634395,lat:56.976393666616254},{lng:24.005336060806712,lat:56.92490408641493},{lng:24.108466782852588,lat:56.889287904181955},{lng:24.291935029312526,lat:56.93221057479092},{lng:24.24517618684422,lat:56.99650208638349}]]}},methods:{updateEdited(t){const e=t.getAt(0).getArray().map(t=>[t.lat().toFixed(6),t.lng().toFixed(6)].join(" ")).join(", ");this.$emit("update:region",e)},handleClickForDelete(t){t.vertex&&this.$refs.polygon.$polygonObject.getPaths().getAt(t.path).removeAt(t.vertex)}}},l=i,c=r("2877"),u=Object(c["a"])(l,n,o,!1,null,null,null);e["default"]=u.exports},b680:function(t,e,r){"use strict";var n=r("23e7"),o=r("a691"),a=r("408a"),i=r("1148"),l=r("d039"),c=1..toFixed,u=Math.floor,s=function(t,e,r){return 0===e?r:e%2===1?s(t,e-1,r*t):s(t*t,e/2,r)},p=function(t){var e=0,r=t;while(r>=4096)e+=12,r/=4096;while(r>=2)e+=1,r/=2;return e},f=c&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!l((function(){c.call({})}));n({target:"Number",proto:!0,forced:f},{toFixed:function(t){var e,r,n,l,c=a(this),f=o(t),h=[0,0,0,0,0,0],d="",g="0",w=function(t,e){var r=-1,n=e;while(++r<6)n+=t*h[r],h[r]=n%1e7,n=u(n/1e7)},m=function(t){var e=6,r=0;while(--e>=0)r+=h[e],h[e]=u(r/t),r=r%t*1e7},b=function(){var t=6,e="";while(--t>=0)if(""!==e||0===t||0!==h[t]){var r=String(h[t]);e=""===e?r:e+i.call("0",7-r.length)+r}return e};if(f<0||f>20)throw RangeError("Incorrect fraction digits");if(c!=c)return"NaN";if(c<=-1e21||c>=1e21)return String(c);if(c<0&&(d="-",c=-c),c>1e-21)if(e=p(c*s(2,69,1))-69,r=e<0?c*s(2,-e,1):c/s(2,e,1),r*=4503599627370496,e=52-e,e>0){w(0,r),n=f;while(n>=7)w(1e7,0),n-=7;w(s(10,n,1),0),n=e-1;while(n>=23)m(1<<23),n-=23;m(1<<n),w(1,1),m(2),g=b()}else w(0,r),w(1<<-e,0),g=b()+i.call("0",f);return f>0?(l=g.length,g=d+(l<=f?"0."+i.call("0",f-l)+g:g.slice(0,l-f)+"."+g.slice(l-f))):g=d+g,g}})}}]);
//# sourceMappingURL=chunk-99151fca.93c3cb56.js.map