(function(){
    /*
     * $RCSfile: ResourceManager.js,v $$
     * $Revision: 1.1 $
     * $Date: 2012-10-18 $
     *
     * Copyright (C) 2008 Skin, Inc. All rights reserved.
     * This software is the proprietary information of Skin, Inc.
     * Use is subject to license terms.
     */
    if(typeof(ResourceManager) == "undefined")
    {
        ResourceManager = {};
    }

    /**
     * @param request
     * @return HttpResponse
     */
    ResourceManager.request = function(request){
        var xmlHttpRequest = (typeof(ActiveXObject) != "undefined" ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest());

        if(xmlHttpRequest != null && xmlHttpRequest != undefined)
        {
            var method = request.method;
            var encoding = request.charset;
            var contentType = request.contentType;
            var mimeType = request.mimeType;

            xmlHttpRequest.open(method, request.url, (request.async != null ? request.async : true));

            if(contentType == null)
            {
                contentType = "application/x-www-form-urlencoded";
            }

            if(encoding != null)
            {
                contentType = contentType + "; charset=" + encoding;
            }

            xmlHttpRequest.setRequestHeader("Content-type", contentType);

            if(mimeType != null && xmlHttpRequest.overrideMimeType != null)
            {
                xmlHttpRequest.overrideMimeType(mimeType);
            }

            xmlHttpRequest.onreadystatechange = function()
            {
                if(xmlHttpRequest.readyState == 4)
                {
                    if(request.callback != null)
                    {
                        request.callback(xmlHttpRequest);
                    }
                    else
                    {
                        if(xmlHttpRequest.status == 0 || xmlHttpRequest.status == 200)
                        {
                            if(request.success != null)
                            {
                                request.success(xmlHttpRequest);
                            }
                        }
                        else if(xmlHttpRequest.status == 404 || xmlHttpRequest.status == 500)
                        {
                            if(request.error != null)
                            {
                                request.error(xmlHttpRequest);
                            }
                        }
                        else
                        {
                            if(request.error != null)
                            {
                                request.error(xmlHttpRequest);
                            }
                        }
                    }
                }
            };

            xmlHttpRequest.setRequestHeader("Accept", "text/javascript, text/html, application/xml, text/xml, */*");
            xmlHttpRequest.send();
        }
        else
        {
            if(request.error != null)
            {
                request.error(xmlHttpRequest);
            }
        }
    };

    /**
     * async load resource
     * @param request
     * @return HttpResponse
     */
    ResourceManager.getResource = function(src){
        var content = null;

        this.request({
            "url": src,
            "method": "GET",
            "contentType": "text/html",
            "mimeType": "text/html",
            "async": false,
            "success": function(response){
                content = response.responseText;
            },
            "error": function(request){
            }
        });

        return content;
    };
})();