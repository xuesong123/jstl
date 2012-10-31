javascript-jstl

javascript templating language

����:
    1. ֧��el���ʽ
    2. ֧��javascript�ű�
    3. ֧��tag
    4. ֧���Զ���tag

2012-10-22 v1.0.1
    1. el
    2. taglib
    3. jsp

1. ʾ��:
    1. ��el���ʽ��֧��
    var context = {"user": {"name": "tome"}};
    var source = "Hello, ${this.user.name}";
    var scriptlet = jsp.runtime.JspRuntime.compile(source);
    var result = scriptlet.execute(context);
    logger.debug(result);

    2. ��script��֧��
    var context = {"user": {"name": "tome"}};
    var source = "<% var user = pageContext.getAttribute("user"); out.println(user.name);%>";
    var scriptlet = jsp.runtime.JspRuntime.compile(source);
    var result = scriptlet.execute(context);
    logger.debug(result);

    3. ��tag��֧��
    // �Ա�ǩ��֧��, ����֧��j2ee���ı�ǩ���е����б�ǩ, sql��fmt����, ��Щ��js��Ҳ�ò���
    var context = {"user": {"name": "tome"}, "userList": [1, 2, 3]};

    // c:each��c:forEach�ļ�д, ������
    var source = "<c:if test="${1 == 1}">hello world!</c:if>  <c:each items=\"${this.userList}\" var=\"myuser\" varStatus=\"status\"><p>${myuser\}</p></c:each>";
    var scriptlet = jsp.runtime.JspRuntime.compile(source);
    var result = scriptlet.execute(context);
    logger.debug(result);

    4. �Զ����ǩ��֧��

    var test = Package.create("test.taglib");
    var DateFormatTag = test.taglib.DateFormatTag = jsp.taglib.TagFactory.create(jsp.taglib.TagSupport, function(){});

    // ����getter��setter����
    DateFormatTag.prototype.setter ...

    DateFormatTag.prototype.doEndTag = function(){
        this.getPageContext().getWriter().print("Hello World !");
        return jsp.taglib.Tag.EVAL_PAGE;
    };

    // ͨ�����´��뵼���Զ����ǩ
    var tagLibrary = jsp.runtime.JspRuntime.getTagLibrary();

    if(tagLibrary != null)
    {
        tagLibrary.setup({
            "c": {"format": "test.taglib.DateFormatTag"}
        });
    }

    // ��ģ����ʹ���Զ����ǩ
    <c:format var="userBirthday" value="${this.user.birthday}" pattern="yyyy-MM-dd HH:mm:ss SSS"/>

2. ����������Ҫel���ʽ�ͽű���֧�֣�������Ҫ��ǩ���֧�ֵĻ����ܼ򵥣�ֻҪ�������ǩ���js����
    <!-- ����� -->
    <script type="text/javascript" src="jstl-1.0.1.js"></script>

    <!-- ��ѡ�� -->
    <script type="text/javascript" src="jstl.taglib.js"></script>

    <!-- ��ѡ�� ������jstl.taglib.js -->
    <script type="text/javascript" src="jstl.taglib.core.js"></script>

    <!-- ��ѡ�� �Զ����ǩ�� ������jstl.taglib.js �� jstl.taglib.core.js -->
    <script type="text/javascript" src="jstl.taglib.scrollpage.js"></script>

3. ��������Ķ�����Զ��ʹ��
    var scriptlet = jsp.runtime.JspRuntime.compile(source);
    var source = "<c:if test="${1 == 1}">hello world!</c:if>  <c:each items=\"${this.userList}\" var=\"myuser\" varStatus=\"status\"><p>${myuser\}</p></c:each>";
    var scriptlet = jsp.runtime.JspRuntime.compile(source);
    var result = scriptlet.execute(context);
    logger.debug(result);

    �´�ʹ�õ�ʱ���ٴε���scriptlet.execute(context);����, ����Ҫ�ظ�����, ÿ�δ����context�����ǲ�ͬ�Ķ���

4. ������
    jsp�к�����д�����, ������д�˸�{, ����ĳЩ����δ����, ���ڴ������ڱ����ִ�е�, ��˺��Ѹ���������������Ĵ�����Ϣ��λ����,
    ���, ����֮�󷵻صĶ�����������˱�����̲�����Դ����, ����ʹ�����´���鿴
    document.getElementById("mytxt").value = scriptlet.script;

5. 1.0.1������˰�testĿ¼���ȥ�ˣ��Ѿ��ϴ������°棬jstl-1.0.2.zip�� ��ʵ��Ȼ��1.0.1�� ������testĿ¼, �Ѿ����ص������°�

2012-10-23
    1. �޸�OutTag��escapeXml������Ч��bug
    2. Class���super֧��, ʹ��this.$super

2012-10-22
    1.0.1����
