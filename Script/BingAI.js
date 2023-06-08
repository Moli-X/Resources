/*
脚本原创：LiuYaChen
*/
   const headers = $request.headers;

   delete headers["user-agent"];
   delete headers["sec-ch-ua-full-version"];
   delete headers["sec-ch-ua-full-version-list"];
   let ua = 'iPhone';
   

   headers['User-Agent'] = `Mozilla/5.0 (${ua}; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.41`;
   headers['sec-ch-ua'] = '"Chromium";v="110", "Not A(Brand";v="24", "Microsoft Edge";v="110"'
   headers['sec-ch-ua-mobile'] = '?0'
   headers['sec-ch-ua-platform'] = 'macOS'

   $done({ headers });
