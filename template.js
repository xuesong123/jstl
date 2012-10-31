/*
 * $RCSfile: TemplateManager,v $$
 * $Revision: 1.1 $
 * $Date: 2012-10-18 $
 *
 * Copyright (C) 2008 Skin, Inc. All rights reserved.
 * This software is the proprietary information of Skin, Inc.
 * Use is subject to license terms.
 */
var TemplateManager = {templates: {}};

/**
 * @param name
 * @return Template
 */
TemplateManager.getTemplate = function(name){
    return this.templates[name];
};

/**
 * @param name
 * @param template
 * @return Template
 */
TemplateManager.setTemplate = function(name, template){
    this.templates[name] = template;
};

/**
 * @param name
 * @param context
 * @return Template
 */
TemplateManager.evaluate = function(name, context){
    if(name != null)
    {
        if(typeof(jQuery) == "undefined")
        {
            throw {"name": "ClassNotFoundException", "message": "'jQuery' not found !"};
        }

        var e = jQuery("script[name=" + name + "]");
        var template = this.getTemplate(name);

        if(template == null)
        {
            template = jsp.runtime.JspRuntime.compile(e.get(0).text);
            this.setTemplate(name, template);
        }

        if(template != null)
        {
            var target = e.attr("update");

            if(target != null)
            {
                var html = template.execute(context);
                jQuery(target).html(html);
            }
        }
    }
};