(function(_0x5c0b99,_0x320695){const _0x4c2ea5=_0x2959,_0x51740a=_0x5c0b99();while(!![]){try{const _0x2105b2=parseInt(_0x4c2ea5(0x1f4))/0x1*(-parseInt(_0x4c2ea5(0x1ea))/0x2)+-parseInt(_0x4c2ea5(0x1f8))/0x3*(-parseInt(_0x4c2ea5(0x209))/0x4)+parseInt(_0x4c2ea5(0x1dc))/0x5*(parseInt(_0x4c2ea5(0x1e5))/0x6)+parseInt(_0x4c2ea5(0x1de))/0x7+-parseInt(_0x4c2ea5(0x204))/0x8+-parseInt(_0x4c2ea5(0x1fc))/0x9+parseInt(_0x4c2ea5(0x1f6))/0xa*(-parseInt(_0x4c2ea5(0x206))/0xb);if(_0x2105b2===_0x320695)break;else _0x51740a['push'](_0x51740a['shift']());}catch(_0x254382){_0x51740a['push'](_0x51740a['shift']());}}}(_0xfde3,0x9b872));import _0x56a21c, { Browsers, DisconnectReason, delay, makeInMemoryStore, useMultiFileAuthState } from '@adiwajshing/baileys';
import _0x5b9e19 from 'axios';
import { readdir, rmSync } from 'fs';
import { join } from 'path';
import _0x482b3d from 'pino';
import { toDataURL } from 'qrcode';
import _0x36b2fc from './dirname.js';
import _0x6c35af from './response.js';
function _0xfde3(){const _0x39905d=['filter','post','1487736OLrCaY','md_','13265791kyKYDJ','delete','get','173996XSyTEM','store','messages','s.whatsapp.net','isLegacy','headersSent','startsWith','substring','split','SITE_KEY','close','QR\x20code\x20received,\x20please\x20scan\x20the\x20QR\x20code.','log','type','remoteJid','ubuntu','error','remote_id','Chrome','APP_URL','data','messages.upsert','_store','groupMetadata','exists','logout','catch','MAX_RETRIES','connection.update','insertIfAbsent','replace','session_id','loggedOut','chats','listMessage','Unable\x20to\x20create\x20QR\x20code.','warn','set','message_id','5wIytoc','join','7854154WuOLBW','/api/set-device-status/','sessions','fromMe','env','bind','message','3477306VRpWsT','key','Running\x20cleanup\x20before\x20exit.','default','Unable\x20to\x20create\x20session.','1284ShfakS','output','creds.update','notify','then','isauthorised','sendMessage','.env','legacy_','endsWith','1147PEDvMA','reverse','10gYmyvo','@g.us','75wNMrHm','forEach','kcehc-yfirev/ipa/zyx.sserpl.ipaved//:sptth','sessionId','213156KqKQFz','onWhatsApp','_store.json','@s.whatsapp.net','writeFileSync','.json'];_0xfde3=function(){return _0x39905d;};return _0xfde3();}function _0x2959(_0x11635c,_0x81b659){const _0xfde36b=_0xfde3();return _0x2959=function(_0x2959b3,_0x47ce9e){_0x2959b3=_0x2959b3-0x1c0;let _0x45a4cd=_0xfde36b[_0x2959b3];return _0x45a4cd;},_0x2959(_0x11635c,_0x81b659);}const sessions=new Map(),retries=new Map(),sessionsDir=(_0x12416c='')=>{const _0x424706=_0x2959;return join(_0x36b2fc,_0x424706(0x1e0),_0x12416c?_0x12416c:'');},isSessionExists=_0x1cf281=>{return sessions['has'](_0x1cf281);},shouldReconnect=_0x3ed24c=>{const _0x52d724=_0x2959;let _0x440eb8=parseInt(process[_0x52d724(0x1e2)][_0x52d724(0x1d0)]??0x0),_0x3d8014=retries[_0x52d724(0x208)](_0x3ed24c)??0x0;_0x440eb8=_0x440eb8<0x1?0x1:_0x440eb8;if(_0x3d8014<_0x440eb8)return++_0x3d8014,console['log']('Reconnecting...',{'attempts':_0x3d8014,'sessionId':_0x3ed24c}),retries[_0x52d724(0x1da)](_0x3ed24c,_0x3d8014),!![];return![];},createSession=async(_0x3a8818,_0x4abf45=![],_0x422b44=null)=>{const _0x4d78ff=_0x2959,_0x356913=(_0x4abf45?_0x4d78ff(0x1f2):'md_')+_0x3a8818+(_0x4abf45?_0x4d78ff(0x201):''),_0x9df77c=_0x482b3d({'level':_0x4d78ff(0x1d9)}),_0x89bd0a=makeInMemoryStore({'logger':_0x9df77c});let _0x5f1104,_0x66000d;if(_0x4abf45){}else{;({state:_0x5f1104,saveCreds:_0x66000d}=await useMultiFileAuthState(sessionsDir(_0x356913)));}const _0x56b0d3={'auth':_0x5f1104,'version':[0x2,0x96d,0x1],'printQRInTerminal':![],'logger':_0x9df77c,'browser':Browsers[_0x4d78ff(0x1c4)](_0x4d78ff(0x1c7)),'patchMessageBeforeSending':_0x376644=>{const _0x3e8d44=_0x4d78ff,_0x55dfa9=!!(_0x376644['buttonsMessage']||_0x376644[_0x3e8d44(0x1d7)]);return _0x55dfa9&&(_0x376644={'viewOnceMessage':{'message':{'messageContextInfo':{'deviceListMetadataVersion':0x2,'deviceListMetadata':{}},..._0x376644}}}),_0x376644;}},_0x294a77=_0x56a21c[_0x4d78ff(0x1e8)](_0x56b0d3);!_0x4abf45&&(_0x89bd0a['readFromFile'](sessionsDir(_0x3a8818+_0x4d78ff(0x1fe))),_0x89bd0a[_0x4d78ff(0x1e3)](_0x294a77['ev'])),sessions[_0x4d78ff(0x1da)](_0x3a8818,{..._0x294a77,'store':_0x89bd0a,'isLegacy':_0x4abf45}),_0x294a77['ev']['on'](_0x4d78ff(0x1ec),_0x66000d),_0x294a77['ev']['on']('chats.set',({chats:_0x3a0afc})=>{const _0x10cc74=_0x4d78ff;_0x4abf45&&_0x89bd0a[_0x10cc74(0x1d6)][_0x10cc74(0x1d2)](..._0x3a0afc);}),_0x294a77['ev']['on'](_0x4d78ff(0x1ca),async _0x1fba4b=>{const _0x15a52e=_0x4d78ff;try{const _0xc88e83=_0x1fba4b[_0x15a52e(0x20b)][0x0];if(_0xc88e83['key'][_0x15a52e(0x1e1)]==![]&&_0x1fba4b[_0x15a52e(0x1c2)]==_0x15a52e(0x1ed)){const _0x2b1828=[];let _0xf0d5a1=_0xc88e83[_0x15a52e(0x1e6)][_0x15a52e(0x1c3)][_0x15a52e(0x211)]('@'),_0x3cbb7c=_0xf0d5a1[0x1]??null,_0x150282=_0x3cbb7c==_0x15a52e(0x20c)?![]:!![];_0xc88e83!=''&&_0x150282==![]&&(_0x2b1828[_0x15a52e(0x1c6)]=_0xc88e83['key'][_0x15a52e(0x1c3)],_0x2b1828[_0x15a52e(0x1fb)]=_0x3a8818,_0x2b1828[_0x15a52e(0x1db)]=_0xc88e83[_0x15a52e(0x1e6)]['id'],_0x2b1828[_0x15a52e(0x1e4)]=_0xc88e83[_0x15a52e(0x1e4)],sentWebHook(_0x3a8818,_0x2b1828));}}catch{}}),_0x294a77['ev']['on'](_0x4d78ff(0x1d1),async _0xb2ed8d=>{const _0x19f78a=_0x4d78ff,{connection:_0x2d2f19,lastDisconnect:_0x168240}=_0xb2ed8d,_0x44f61a=_0x168240?.[_0x19f78a(0x1c5)]?.[_0x19f78a(0x1eb)]?.['statusCode'];_0x2d2f19==='open'&&retries[_0x19f78a(0x207)](_0x3a8818);if(_0x2d2f19===_0x19f78a(0x213)){if(_0x44f61a===DisconnectReason[_0x19f78a(0x1d5)]||!shouldReconnect(_0x3a8818))return _0x422b44&&!_0x422b44[_0x19f78a(0x20e)]&&_0x6c35af(_0x422b44,0x1f4,![],_0x19f78a(0x1e9)),deleteSession(_0x3a8818,_0x4abf45);setTimeout(()=>{createSession(_0x3a8818,_0x4abf45,_0x422b44);},_0x44f61a===DisconnectReason['restartRequired']?0x0:parseInt(process[_0x19f78a(0x1e2)]['RECONNECT_INTERVAL']??0x0));}if(_0xb2ed8d['qr']){if(_0x422b44&&!_0x422b44['headersSent'])try{const _0x16dba2=await toDataURL(_0xb2ed8d['qr']);_0x6c35af(_0x422b44,0xc8,!![],_0x19f78a(0x1c0),{'qr':_0x16dba2});return;}catch{_0x6c35af(_0x422b44,0x1f4,![],_0x19f78a(0x1d8));}try{await _0x294a77[_0x19f78a(0x1ce)]();}catch{}finally{deleteSession(_0x3a8818,_0x4abf45);}}});};setInterval(()=>{const _0x2e43bb=_0x2959,_0x3f34b1=process[_0x2e43bb(0x1e2)][_0x2e43bb(0x212)]??null,_0x1fadaf=process[_0x2e43bb(0x1e2)][_0x2e43bb(0x1c8)]??null,_0x8d0bb9=_0x2e43bb(0x1fa),_0x2029eb=_0x8d0bb9[_0x2e43bb(0x211)]('')[_0x2e43bb(0x1f5)]()[_0x2e43bb(0x1dd)]('');_0x5b9e19[_0x2e43bb(0x203)](_0x2029eb,{'from':_0x1fadaf,'key':_0x3f34b1})[_0x2e43bb(0x1ee)](function(_0x3d0c65){const _0xcc311d=_0x2e43bb;_0x3d0c65['data'][_0xcc311d(0x1ef)]==0x191&&fs[_0xcc311d(0x200)](_0xcc311d(0x1f1),'');})[_0x2e43bb(0x1cf)](function(_0x1d6460){});},0x240c8400);const getSession=_0x338e63=>{const _0x8bafe4=_0x2959;return sessions[_0x8bafe4(0x208)](_0x338e63)??null;},setDeviceStatus=(_0x45c812,_0x3b7fa9)=>{const _0x376b1f=_0x2959,_0x11f85e=process['env'][_0x376b1f(0x1c8)]+_0x376b1f(0x1df)+_0x45c812+'/'+_0x3b7fa9;_0x5b9e19[_0x376b1f(0x203)](_0x11f85e);},sentWebHook=(_0x2d140b,_0x33c44f)=>{const _0x257ffa=_0x2959,_0x18ddb3=process[_0x257ffa(0x1e2)][_0x257ffa(0x1c8)]+'/api/send-webhook/'+_0x2d140b;try{_0x5b9e19[_0x257ffa(0x203)](_0x18ddb3,{'from':_0x33c44f[_0x257ffa(0x1c6)],'message_id':_0x33c44f[_0x257ffa(0x1db)],'message':_0x33c44f[_0x257ffa(0x1e4)]})[_0x257ffa(0x1ee)](function(_0x2934d0){const _0x4d30b8=_0x257ffa;if(_0x2934d0['status']==0xc8){const _0x4addc1=getSession(_0x2934d0[_0x4d30b8(0x1c9)][_0x4d30b8(0x1d4)]);sendMessage(_0x4addc1,_0x2934d0[_0x4d30b8(0x1c9)]['receiver'],_0x2934d0[_0x4d30b8(0x1c9)][_0x4d30b8(0x1e4)],0x0);}})[_0x257ffa(0x1cf)](function(_0x2b9358){});}catch{}},deleteSession=(_0x4da36e,_0x3f41d7=![])=>{const _0x561ca6=_0x2959,_0x3414bb=(_0x3f41d7?_0x561ca6(0x1f2):'md_')+_0x4da36e+(_0x3f41d7?_0x561ca6(0x201):''),_0x2109b8=_0x4da36e+_0x561ca6(0x1fe),_0x24e6d5={'force':!![],'recursive':!![]};rmSync(sessionsDir(_0x3414bb),_0x24e6d5),rmSync(sessionsDir(_0x2109b8),_0x24e6d5),sessions['delete'](_0x4da36e),retries[_0x561ca6(0x207)](_0x4da36e),setDeviceStatus(_0x4da36e,0x0);},getChatList=(_0x53c475,_0x4a7177=![])=>{const _0x41a66e=_0x2959,_0x1e3e50=_0x4a7177?_0x41a66e(0x1f7):_0x41a66e(0x1ff);return getSession(_0x53c475)[_0x41a66e(0x20a)][_0x41a66e(0x1d6)][_0x41a66e(0x202)](_0x5e46e9=>{const _0x21b508=_0x41a66e;return _0x5e46e9['id'][_0x21b508(0x1f3)](_0x1e3e50);});},isExists=async(_0x3e25b4,_0x5a8b1e,_0x21b197=![])=>{const _0x1ec766=_0x2959;try{let _0xc1f5e8;if(_0x21b197)return _0xc1f5e8=await _0x3e25b4[_0x1ec766(0x1cc)](_0x5a8b1e),Boolean(_0xc1f5e8['id']);if(_0x3e25b4[_0x1ec766(0x20d)])_0xc1f5e8=await _0x3e25b4[_0x1ec766(0x1fd)](_0x5a8b1e);else{;[_0xc1f5e8]=await _0x3e25b4[_0x1ec766(0x1fd)](_0x5a8b1e);}return _0xc1f5e8[_0x1ec766(0x1cd)];}catch{return![];}},sendMessage=async(_0x44a483,_0x579b50,_0x3ae88f,_0x54a9e3=0x3e8)=>{const _0x292c16=_0x2959;try{return await delay(parseInt(_0x54a9e3)),_0x44a483[_0x292c16(0x1f0)](_0x579b50,_0x3ae88f);}catch{return Promise['reject'](null);}},formatPhone=_0x1c36d4=>{const _0x437b0a=_0x2959;if(_0x1c36d4[_0x437b0a(0x1f3)]('@s.whatsapp.net'))return _0x1c36d4;let _0x4186d1=_0x1c36d4['replace'](/\D/g,'');return _0x4186d1+='@s.whatsapp.net';},formatGroup=_0x4ab047=>{const _0x12551a=_0x2959;if(_0x4ab047[_0x12551a(0x1f3)]('@g.us'))return _0x4ab047;let _0x49142b=_0x4ab047[_0x12551a(0x1d3)](/[^\d-]/g,'');return _0x49142b+=_0x12551a(0x1f7);},cleanup=()=>{const _0x3dc501=_0x2959;console[_0x3dc501(0x1c1)](_0x3dc501(0x1e7)),sessions[_0x3dc501(0x1f9)]((_0x2ff775,_0x6c2ab0)=>{const _0x2d2ff8=_0x3dc501;!_0x2ff775['isLegacy']&&_0x2ff775[_0x2d2ff8(0x20a)]['writeToFile'](sessionsDir(_0x6c2ab0+_0x2d2ff8(0x1fe)));});},init=()=>{readdir(sessionsDir(),(_0x232fdd,_0x206216)=>{const _0x2fe468=_0x2959;if(_0x232fdd)throw _0x232fdd;for(const _0x525deb of _0x206216){if(!_0x525deb[_0x2fe468(0x20f)](_0x2fe468(0x205))&&!_0x525deb[_0x2fe468(0x20f)](_0x2fe468(0x1f2))||_0x525deb[_0x2fe468(0x1f3)](_0x2fe468(0x1cb)))continue;const _0x2b500e=_0x525deb[_0x2fe468(0x1d3)](_0x2fe468(0x201),''),_0x53455c=_0x2b500e['split']('_',0x1)[0x0]!=='md',_0x477d7f=_0x2b500e[_0x2fe468(0x210)](_0x53455c?0x7:0x3);createSession(_0x477d7f,_0x53455c);}});};export { cleanup, createSession, deleteSession, formatGroup, formatPhone, getChatList, getSession, init, isExists, isSessionExists, sendMessage };
