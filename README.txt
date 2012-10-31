javascript-jstl

javascript templating language

功能:
    1. 支持el表达式
    2. 支持javascript脚本
    3. 支持tag
    4. 支持自定义tag

2012-10-22 v1.0.1
    1. el
    2. taglib
    3. jsp

1. 示例:
    1. 对el表达式的支持
    var context = {"user": {"name": "tome"}};
    var source = "Hello, ${this.user.name}";
    var scriptlet = jsp.runtime.JspRuntime.compile(source);
    var result = scriptlet.execute(context);
    logger.debug(result);

    2. 对script的支持
    var context = {"user": {"name": "tome"}};
    var source = "<% var user = pageContext.getAttribute("user"); out.println(user.name);%>";
    var scriptlet = jsp.runtime.JspRuntime.compile(source);
    var result = scriptlet.execute(context);
    logger.debug(result);

    3. 对tag的支持
    // 对标签的支持, 几乎支持j2ee核心标签库中的所有标签, sql和fmt除外, 这些在js中也用不到
    var context = {"user": {"name": "tome"}, "userList": [1, 2, 3]};

    // c:each是c:forEach的简写, 都可以
    var source = "<c:if test="${1 == 1}">hello world!</c:if>  <c:each items=\"${this.userList}\" var=\"myuser\" varStatus=\"status\"><p>${myuser\}</p></c:each>";
    var scriptlet = jsp.runtime.JspRuntime.compile(source);
    var result = scriptlet.execute(context);
    logger.debug(result);

    4. 自定义标签的支持

    var test = Package.create("test.taglib");
    var DateFormatTag = test.taglib.DateFormatTag = jsp.taglib.TagFactory.create(jsp.taglib.TagSupport, function(){});

    // 定义getter和setter方法
    DateFormatTag.prototype.setter ...

    DateFormatTag.prototype.doEndTag = function(){
        this.getPageContext().getWriter().print("Hello World !");
        return jsp.taglib.Tag.EVAL_PAGE;
    };

    // 通过如下代码导入自定义标签
    var tagLibrary = jsp.runtime.JspRuntime.getTagLibrary();

    if(tagLibrary != null)
    {
        tagLibrary.setup({
            "c": {"format": "test.taglib.DateFormatTag"}
        });
    }

    // 在模板中使用自定义标签
    <c:format var="userBirthday" value="${this.user.birthday}" pattern="yyyy-MM-dd HH:mm:ss SSS"/>

2. 如果你仅仅需要el表达式和脚本的支持，而不需要标签库的支持的话，很简单，只要不导入标签库的js即可
    <!-- 必须的 -->
    <script type="text/javascript" src="jstl-1.0.1.js"></script>

    <!-- 可选的 -->
    <script type="text/javascript" src="jstl.taglib.js"></script>

    <!-- 可选的 依赖于jstl.taglib.js -->
    <script type="text/javascript" src="jstl.taglib.core.js"></script>

    <!-- 可选的 自定义标签库 依赖于jstl.taglib.js 和 jstl.taglib.core.js -->
    <script type="text/javascript" src="jstl.taglib.scrollpage.js"></script>

3. 编译出来的对象可以多次使用
    var scriptlet = jsp.runtime.JspRuntime.compile(source);
    var source = "<c:if test="${1 == 1}">hello world!</c:if>  <c:each items=\"${this.userList}\" var=\"myuser\" varStatus=\"status\"><p>${myuser\}</p></c:each>";
    var scriptlet = jsp.runtime.JspRuntime.compile(source);
    var result = scriptlet.execute(context);
    logger.debug(result);

    下次使用的时候再次调用scriptlet.execute(context);即可, 不需要重复编译, 每次传入的context可以是不同的对象

4. 错误检查
    jsp中很容易写错代码, 比如少写了个{, 或者某些变量未定义, 由于代码是在编译后执行的, 因此很难根据浏览器报出来的错误信息定位错误,
    因此, 编译之后返回的对象里面包含了编译过程产生的源代码, 可以使用如下代码查看
    document.getElementById("mytxt").value = scriptlet.script;

5. 1.0.1打包忘了把test目录打进去了，已经上传了最新版，jstl-1.0.2.zip， 其实仍然是1.0.1， 包含了test目录, 已经下载的重新下吧

2012-10-23
    1. 修改OutTag的escapeXml属性无效的bug
    2. Class添加super支持, 使用this.$super

2012-10-22
    1.0.1发布
