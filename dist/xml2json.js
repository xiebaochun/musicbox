!function(){function e(e){var t,n;if(!e||"string"!=typeof e)return null;try{window.DOMParser?(n=new DOMParser,t=n.parseFromString(e,"text/xml")):(t=new ActiveXObject("Microsoft.XMLDOM"),t.async="false",t.loadXML(e))}catch(r){t=void 0}if(!t||!t.documentElement||t.getElementsByTagName("parsererror").length)throw new Error("Invalid XML: "+e);return t}function t(e,t){return t.normalize?(e||"").trim():e}function n(e,r){var o,i,a,u,l={},d={};if(l[r.attrkey]=d,e.attributes&&e.attributes.length>0)for(o=0;o<e.attributes.length;o++){var s=e.attributes.item(o);d[s.nodeName]=s.value}for(0===e.childElementCount&&(l[r.charkey]=t(e.textContent,r)),o=0;o<e.childNodes.length;o++)if(i=e.childNodes[o],1===i.nodeType)if(a=0===i.attributes.length&&0===i.childElementCount?t(i.textContent,r):n(i,r),u=i.nodeName,l.hasOwnProperty(u)){var f=l[u];Array.isArray(f)||(f=[f],l[u]=f),f.push(a)}else l[u]=a;return l}function r(r,i){if(!r)return r;i=i||o,"string"==typeof r&&(r=e(r).documentElement);var a={};return 0===r.attributes.length&&0===r.childElementCount?a[r.nodeName]=t(r.textContent,i):a[r.nodeName]=n(r,i),a}var o={attrkey:"$",charkey:"_",normalize:!1};"undefined"!=typeof jQuery?jQuery.extend({xml2json:r}):"undefined"!=typeof module?module.exports=r:"undefined"!=typeof window&&(window.xml2json=r)}();