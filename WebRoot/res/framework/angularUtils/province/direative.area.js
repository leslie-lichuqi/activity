angular.module("directive.area",[])
.directive("provinceSelector",["areaFactory",function(areaFactory){
	return {
		restrict:"EA",
		replace:true,
		scope:{
			province:"="
		},
		template: "<select   ng-model='province' \
	 	ng-options='province.name as province.name for province in area.province'></select>",
		controller:function($scope,$element,$attrs,$transclude){
			$scope.area = areaFactory.getAreaArray();
		}
	}
}])
.directive("citysSelector",["areaFactory",function(areaFactory){
	return {
		restrict:"EA",
		replace:true,
		scope:{
			province:"=",
			city:"="
		},
		template: "<select ng-model='city' \
	 	ng-options='city.name as city.name for city in citys.city'></select>",
		controller:function($scope,$element,$attrs,$transclude){
			$scope.$watch("province",function(n,o){
				if(n!=o){
					$scope.citys = areaFactory.getCityArray(n);
				}
			})
		}
	}
}])
.factory("areaFactory",function(){
	var arr = {"name":"中国","province":[{"name":"北京市","id":"10006","citys":{"city":[{"name":"朝阳区","id":"12471"},{"name":"东城区","id":"12469"},{"name":"西城区","id":"12470"},{"name":"北京","id":"10060"},{"name":"海淀区","id":"14"},{"name":"昌平区","id":"17"},{"name":"丰台区","id":"35"},{"name":"大兴区","id":"51"},{"name":"通州区","id":"54"},{"name":"顺义区","id":"60"},{"name":"门头沟","id":"85"},{"name":"房山区","id":"12487"},{"name":"怀柔区","id":"12517"},{"name":"石景山区","id":"12572"}]}},{"name":"重庆市","id":"10007","citys":{"city":[{"name":"重庆","id":"10061"}]}},{"name":"福建省","id":"10008","citys":{"city":[{"name":"福州市","id":"10062"},{"name":"福安市","id":"10063"},{"name":"龙岩市","id":"10064"},{"name":"南平市","id":"10065"},{"name":"宁德市","id":"10066"},{"name":"莆田市","id":"10067"},{"name":"泉州市","id":"10068"},{"name":"三明市","id":"10069"},{"name":"邵武市","id":"10070"},{"name":"石狮市","id":"10071"},{"name":"永安市","id":"10072"},{"name":"武夷山","id":"10073"},{"name":"厦门市","id":"10074"},{"name":"漳州市","id":"10075"},{"name":"南平市","id":"36"},{"name":"晋江市","id":"12489"},{"name":"福清市","id":"12497"},{"name":"南安市","id":"12557"},{"name":"泰州市","id":"12577"}]}},{"name":"甘肃省","id":"10009","citys":{"city":[{"name":"兰州市","id":"10076"},{"name":"白银市","id":"10077"},{"name":"定西市","id":"10078"},{"name":"敦煌市","id":"10079"},{"name":"甘南市","id":"10080"},{"name":"金昌市","id":"10081"},{"name":"酒泉市","id":"10082"},{"name":"临夏市","id":"10083"},{"name":"平凉市","id":"10084"},{"name":"天水市","id":"10085"},{"name":"武都市","id":"10086"},{"name":"武威市","id":"10087"},{"name":"西峰市","id":"10088"},{"name":"张掖市","id":"10089"},{"name":"陇南市","id":"70"},{"name":"庆阳市","id":"12509"},{"name":"嘉峪关市","id":"12515"},{"name":"玉门市","id":"12547"},{"name":"合作市","id":"12552"}]}},{"name":"广东省","id":"10010","citys":{"city":[{"name":"广州市","id":"10090"},{"name":"潮阳市","id":"10091"},{"name":"潮州市","id":"10092"},{"name":"澄海市","id":"10093"},{"name":"东莞市","id":"10094"},{"name":"佛山市","id":"10095"},{"name":"河源市","id":"10096"},{"name":"惠州市","id":"10097"},{"name":"江门市","id":"10098"},{"name":"揭阳市","id":"10099"},{"name":"开平市","id":"10100"},{"name":"茂名市","id":"10101"},{"name":"梅州市","id":"10102"},{"name":"清远市","id":"10103"},{"name":"汕头市","id":"10104"},{"name":"汕尾市","id":"10105"},{"name":"韶关市","id":"10106"},{"name":"深圳市","id":"10107"},{"name":"顺德市","id":"10108"},{"name":"阳江市","id":"10109"},{"name":"英德市","id":"10110"},{"name":"云浮市","id":"10111"},{"name":"增城市","id":"10112"},{"name":"湛江市","id":"10113"},{"name":"肇庆市","id":"10114"},{"name":"中山市","id":"10115"},{"name":"珠海市","id":"10116"},{"name":"陆丰市","id":"18"},{"name":"罗定市","id":"90"},{"name":"台州市","id":"96"},{"name":"普宁市","id":"101"},{"name":"南雄市","id":"106"},{"name":"四会市","id":"12484"},{"name":"高州市","id":"12492"},{"name":"阳春市","id":"12508"},{"name":"雷州市","id":"12523"},{"name":"乐昌市","id":"12573"}]}},{"name":"广西","id":"10011","citys":{"city":[{"name":"南宁市","id":"10117"},{"name":"百色市","id":"10118"},{"name":"北海市","id":"10119"},{"name":"桂林市","id":"10120"},{"name":"防城港市","id":"10121"},{"name":"河池市","id":"10122"},{"name":"贺州市","id":"10123"},{"name":"柳州市","id":"10124"},{"name":"钦州市","id":"10125"},{"name":"梧州市","id":"10126"},{"name":"玉林市","id":"10127"},{"name":"贵港市","id":"7"},{"name":"桂平市","id":"12522"},{"name":"北流市","id":"12581"}]}},{"name":"贵州省","id":"10012","citys":{"city":[{"name":"贵阳市","id":"10128"},{"name":"安顺市","id":"10129"},{"name":"毕节市","id":"10130"},{"name":"都匀市","id":"10131"},{"name":"凯里市","id":"10132"},{"name":"六盘水市","id":"10133"},{"name":"铜仁市","id":"10134"},{"name":"兴义市","id":"10135"},{"name":"玉屏市","id":"10136"},{"name":"遵义市","id":"10137"},{"name":"松桃市","id":"56"},{"name":"惠水市","id":"89"},{"name":"黔南州","id":"12531"},{"name":"清镇市","id":"12534"}]}},{"name":"海南省","id":"10013","citys":{"city":[{"name":"海口市","id":"10138"},{"name":"儋县市","id":"10139"},{"name":"陵水市","id":"10140"},{"name":"琼海市","id":"10141"},{"name":"三亚市","id":"10142"},{"name":"五指山市","id":"10143"},{"name":"万宁市","id":"10144"},{"name":"昌江县市","id":"66"},{"name":"白沙县市","id":"12500"},{"name":"儋州市","id":"12519"},{"name":"定安县","id":"12560"},{"name":"屯昌县","id":"12568"},{"name":"东方市","id":"12571"},{"name":"保亭县","id":"12583"},{"name":"乐东县","id":"14493"},{"name":"文昌市","id":"14494"}]}},{"name":"河北省","id":"10014","citys":{"city":[{"name":"石家庄市","id":"10145"},{"name":"保定市","id":"10146"},{"name":"北戴河市","id":"10147"},{"name":"沧州市","id":"10148"},{"name":"承德市","id":"10149"},{"name":"丰润市","id":"10150"},{"name":"邯郸市","id":"10151"},{"name":"衡水市","id":"10152"},{"name":"廊坊市","id":"10153"},{"name":"南戴河市","id":"10154"},{"name":"秦皇岛市","id":"10155"},{"name":"唐山市","id":"10156"},{"name":"新城市","id":"10157"},{"name":"邢台市","id":"10158"},{"name":"张家口市","id":"10159"},{"name":"昌黎县","id":"26"},{"name":"辛集市","id":"50"},{"name":"武安市","id":"67"},{"name":"定州市","id":"71"},{"name":"霸州市","id":"82"},{"name":"高碑店市","id":"12543"},{"name":"河间市","id":"12544"},{"name":"黄骅市","id":"12551"},{"name":"任丘市","id":"12565"}]}},{"name":"黑龙江省","id":"10015","citys":{"city":[{"name":"哈尔滨市","id":"10160"},{"name":"北安市","id":"10161"},{"name":"大庆市","id":"10162"},{"name":"大兴安岭市","id":"10163"},{"name":"鹤岗市","id":"10164"},{"name":"黑河市","id":"10165"},{"name":"佳木斯市","id":"10166"},{"name":"鸡西市","id":"10167"},{"name":"牡丹江市","id":"10168"},{"name":"齐齐哈尔市","id":"10169"},{"name":"七台河市","id":"10170"},{"name":"双鸭山市","id":"10171"},{"name":"绥化市","id":"10172"},{"name":"伊春市","id":"10173"},{"name":"绥芬河市","id":"12"},{"name":"肇东市","id":"57"},{"name":"虎林市","id":"69"},{"name":"讷河市","id":"12511"},{"name":"穆棱市","id":"12549"},{"name":"同江市","id":"12562"},{"name":"加格达奇市","id":"12564"}]}},{"name":"河南省","id":"10016","citys":{"city":[{"name":"郑州市","id":"10174"},{"name":"安阳市","id":"10175"},{"name":"鹤壁市","id":"10176"},{"name":"潢川市","id":"10177"},{"name":"焦作市","id":"10178"},{"name":"济源市","id":"10179"},{"name":"开封市","id":"10180"},{"name":"漯河市","id":"10181"},{"name":"洛阳市","id":"10182"},{"name":"南阳市","id":"10183"},{"name":"平顶山","id":"10184"},{"name":"濮阳市","id":"10185"},{"name":"三门峡市","id":"10186"},{"name":"商丘市","id":"10187"},{"name":"新乡市","id":"10188"},{"name":"信阳市","id":"10189"},{"name":"许昌市","id":"10190"},{"name":"周口市","id":"10191"},{"name":"驻马店市","id":"10192"},{"name":"永城市","id":"23"},{"name":"灵宝市","id":"87"},{"name":"禹州市","id":"12475"},{"name":"孟州市","id":"12477"},{"name":"登封市","id":"12486"},{"name":"南阳市","id":"12537"},{"name":"长葛市","id":"12546"},{"name":"新郑市","id":"12555"},{"name":"邓州市","id":"12588"}]}},{"name":"香港","id":"10017","citys":{"city":[{"name":"香港","id":"10193"},{"name":"九龙","id":"10194"},{"name":"新界","id":"10195"}]}},{"name":"湖北省","id":"10018","citys":{"city":[{"name":"武汉市","id":"10196"},{"name":"恩施市","id":"10197"},{"name":"鄂州市","id":"10198"},{"name":"黄冈市","id":"10199"},{"name":"黄石市","id":"10200"},{"name":"荆门市","id":"10201"},{"name":"荆州市","id":"10202"},{"name":"潜江市","id":"10203"},{"name":"十堰市","id":"10204"},{"name":"随州市","id":"10205"},{"name":"武穴市","id":"10206"},{"name":"仙桃市","id":"10207"},{"name":"咸宁市","id":"10208"},{"name":"襄阳市","id":"10209"},{"name":"孝感市","id":"10211"},{"name":"宜昌市","id":"10212"},{"name":"赤壁市","id":"24"},{"name":"松滋市","id":"25"},{"name":"襄樊市","id":"53"},{"name":"天门市","id":"61"},{"name":"宜城市","id":"68"},{"name":"大冶市","id":"12473"},{"name":"枣阳市","id":"12482"},{"name":"洪湖市","id":"12485"},{"name":"应城市","id":"12507"},{"name":"丹江口市","id":"12516"},{"name":"汉川市","id":"12539"},{"name":"利川市","id":"12548"},{"name":"宜都市","id":"12566"},{"name":"麻城市","id":"12575"},{"name":"广水市","id":"12578"}]}},{"name":"湖南省","id":"10019","citys":{"city":[{"name":"长沙市","id":"10213"},{"name":"常德市","id":"10214"},{"name":"郴州市","id":"10215"},{"name":"衡阳市","id":"10216"},{"name":"怀化市","id":"10217"},{"name":"吉首市","id":"10218"},{"name":"娄底市","id":"10219"},{"name":"邵阳市","id":"10220"},{"name":"湘潭市","id":"10221"},{"name":"益阳市","id":"10222"},{"name":"岳阳市","id":"10223"},{"name":"永州市","id":"10224"},{"name":"张家界市","id":"10225"},{"name":"株洲市","id":"10226"},{"name":"邵东市","id":"75"},{"name":"湘西州市","id":"12496"},{"name":"耒阳市","id":"12550"}]}},{"name":"江苏省","id":"10020","citys":{"city":[{"name":"南京市","id":"10227"},{"name":"常熟市","id":"10228"},{"name":"常州市","id":"10229"},{"name":"海门市","id":"10230"},{"name":"淮安市","id":"10231"},{"name":"江都市","id":"10232"},{"name":"江阴市","id":"10233"},{"name":"昆山市","id":"10234"},{"name":"连云港","id":"10235"},{"name":"南通市","id":"10236"},{"name":"启东市","id":"10237"},{"name":"沭阳市","id":"10238"},{"name":"宿迁市","id":"10239"},{"name":"苏州市","id":"10240"},{"name":"太仓市","id":"10241"},{"name":"泰州市","id":"10242"},{"name":"同里市","id":"10243"},{"name":"无锡市","id":"10244"},{"name":"徐州市","id":"10245"},{"name":"盐城市","id":"10246"},{"name":"扬州市","id":"10247"},{"name":"宜兴市","id":"10248"},{"name":"仪征市","id":"10249"},{"name":"张家港市","id":"10250"},{"name":"镇江市","id":"10251"},{"name":"周庄市","id":"10252"},{"name":"吴江市","id":"39"},{"name":"金坛市","id":"44"},{"name":"新沂市","id":"59"},{"name":"扬中市","id":"78"},{"name":"高邮市","id":"12491"},{"name":"东台市","id":"12495"},{"name":"如皋市","id":"12501"},{"name":"丹阳市","id":"12567"},{"name":"泰兴市","id":"12587"}]}},{"name":"江西省","id":"10021","citys":{"city":[{"name":"南昌市","id":"10253"},{"name":"抚州市","id":"10254"},{"name":"赣州市","id":"10255"},{"name":"吉安市","id":"10256"},{"name":"景德镇","id":"10257"},{"name":"井冈山","id":"10258"},{"name":"九江市","id":"10259"},{"name":"庐山市","id":"10260"},{"name":"萍乡市","id":"10261"},{"name":"上饶市","id":"10262"},{"name":"新余市","id":"10263"},{"name":"宜春市","id":"10264"},{"name":"鹰潭市","id":"10265"},{"name":"丰城市","id":"12513"},{"name":"瑞昌市","id":"12545"}]}},{"name":"吉林省","id":"10022","citys":{"city":[{"name":"长春市","id":"10266"},{"name":"白城市","id":"10267"},{"name":"白山市","id":"10268"},{"name":"珲春市","id":"10269"},{"name":"辽源市","id":"10270"},{"name":"梅河市","id":"10271"},{"name":"吉林市","id":"10272"},{"name":"四平市","id":"10273"},{"name":"松原市","id":"10274"},{"name":"通化市","id":"10275"},{"name":"延吉市","id":"10276"},{"name":"舒兰市","id":"72"},{"name":"蛟河市","id":"99"},{"name":"延边市","id":"12514"},{"name":"榆树市","id":"12532"},{"name":"敦化市","id":"14490"}]}},{"name":"辽宁省","id":"10023","citys":{"city":[{"name":"沈阳市","id":"10277"},{"name":"鞍山市","id":"10278"},{"name":"本溪市","id":"10279"},{"name":"朝阳市","id":"10280"},{"name":"大连市","id":"10281"},{"name":"丹东市","id":"10282"},{"name":"抚顺市","id":"10283"},{"name":"阜新市","id":"10284"},{"name":"葫芦岛市","id":"10285"},{"name":"锦州市","id":"10286"},{"name":"辽阳市","id":"10287"},{"name":"盘锦市","id":"10288"},{"name":"铁岭市","id":"10289"},{"name":"营口市","id":"10290"},{"name":"盖州市","id":"10"},{"name":"海城市","id":"20"},{"name":"北票市","id":"28"},{"name":"大石桥市","id":"12476"},{"name":"东港市","id":"12576"}]}},{"name":"澳门","id":"10024","citys":{"city":[{"name":"澳门","id":"10291"}]}},{"name":"内蒙古","id":"10025","citys":{"city":[{"name":"呼和浩特市","id":"10292"},{"name":"阿拉善盟市","id":"10293"},{"name":"包头市","id":"10294"},{"name":"赤峰市","id":"10295"},{"name":"东胜市","id":"10296"},{"name":"海拉尔市","id":"10297"},{"name":"集宁市","id":"10298"},{"name":"临河市","id":"10299"},{"name":"通辽市","id":"10300"},{"name":"乌海市","id":"10301"},{"name":"乌兰浩特市","id":"10302"},{"name":"锡林浩特市","id":"10303"},{"name":"通辽市","id":"8"},{"name":"巴彦淖尔市","id":"34"},{"name":"鄂尔多斯市","id":"38"},{"name":"满洲里市","id":"81"},{"name":"乌兰察布市","id":"88"},{"name":"呼伦贝尔市","id":"12559"},{"name":"兴安盟","id":"14489"}]}},{"name":"宁夏","id":"10026","citys":{"city":[{"name":"银川市","id":"10304"},{"name":"固原市","id":"10305"},{"name":"石嘴山","id":"10306"},{"name":"吴忠市","id":"10307"},{"name":"中卫市","id":"12499"}]}},{"name":"青海","id":"10027","citys":{"city":[{"name":"西宁市","id":"10308"},{"name":"德令哈市","id":"10309"},{"name":"格尔木市","id":"10310"},{"name":"共和市","id":"10311"},{"name":"海东市","id":"10312"},{"name":"海晏市","id":"10313"},{"name":"玛沁市","id":"10314"},{"name":"同仁市","id":"10315"},{"name":"玉树市","id":"10316"},{"name":"海南州市","id":"46"},{"name":"海西州市","id":"12472"},{"name":"果洛州","id":"12536"}]}},{"name":"山东省","id":"10028","citys":{"city":[{"name":"济南市","id":"10317"},{"name":"滨州市","id":"10318"},{"name":"兖州市","id":"10319"},{"name":"德州市","id":"10320"},{"name":"东营市","id":"10321"},{"name":"菏泽市","id":"10322"},{"name":"济宁市","id":"10323"},{"name":"莱芜市","id":"10324"},{"name":"聊城市","id":"10325"},{"name":"临沂市","id":"10326"},{"name":"蓬莱市","id":"10327"},{"name":"青岛市","id":"10328"},{"name":"曲阜市","id":"10329"},{"name":"日照市","id":"10330"},{"name":"泰安市","id":"10331"},{"name":"潍坊市","id":"10332"},{"name":"威海市","id":"10333"},{"name":"烟台市","id":"10334"},{"name":"枣庄市","id":"10335"},{"name":"淄博市","id":"10336"},{"name":"莱州市","id":"16"},{"name":"青州市","id":"43"},{"name":"乐陵市","id":"102"},{"name":"临遗市","id":"104"},{"name":"即墨市","id":"12502"},{"name":"莱西市","id":"12504"},{"name":"海阳市","id":"12520"},{"name":"新泰市","id":"12525"},{"name":"临清市","id":"12529"},{"name":"滕州市","id":"12541"},{"name":"龙口市","id":"12554"},{"name":"寿光市","id":"12570"}]}},{"name":"上海市","id":"10029","citys":{"city":[{"name":"陆家嘴区","id":"4"},{"name":"崇明区","id":"10338"},{"name":"朱家角区","id":"10339"},{"name":"虹口区","id":"5"},{"name":"徐汇区","id":"9"},{"name":"浦东新区","id":"11"},{"name":"闵行区","id":"15"},{"name":"静安区","id":"21"},{"name":"嘉定区","id":"22"},{"name":"奉贤区","id":"30"},{"name":"普陀区","id":"37"},{"name":"金山区","id":"45"},{"name":"长宁区","id":"47"},{"name":"松江区","id":"49"},{"name":"青浦区","id":"55"},{"name":"宝山区","id":"58"},{"name":"卢湾区","id":"62"},{"name":"杨浦区","id":"63"},{"name":"黄浦区","id":"73"},{"name":"闸北区","id":"74"},{"name":"南汇区","id":"91"}]}},{"name":"山西省","id":"10030","citys":{"city":[{"name":"太原市","id":"10340"},{"name":"长治市","id":"10341"},{"name":"大同市","id":"10342"},{"name":"候马市","id":"10343"},{"name":"晋城市","id":"10344"},{"name":"离石市","id":"10345"},{"name":"临汾市","id":"10346"},{"name":"宁武市","id":"10347"},{"name":"朔州市","id":"10348"},{"name":"忻州市","id":"10349"},{"name":"阳泉市","id":"10350"},{"name":"榆次市","id":"10351"},{"name":"运城市","id":"10352"},{"name":"河津市","id":"65"},{"name":"晋中市","id":"77"},{"name":"汾阳市","id":"12510"},{"name":"吕梁市","id":"12535"},{"name":"龙口市","id":"12553"},{"name":"原平市","id":"12558"},{"name":"孝义市","id":"12569"},{"name":"介休市","id":"12579"}]}},{"name":"陕西省","id":"10031","citys":{"city":[{"name":"西安市","id":"10353"},{"name":"安康市","id":"10354"},{"name":"宝鸡市","id":"10355"},{"name":"汉中市","id":"10356"},{"name":"渭南市","id":"10357"},{"name":"商州市","id":"10358"},{"name":"绥德市","id":"10359"},{"name":"铜川市","id":"10360"},{"name":"咸阳市","id":"10361"},{"name":"延安市","id":"10362"},{"name":"榆林市","id":"10363"},{"name":"朔州市","id":"76"},{"name":"商洛市","id":"103"},{"name":"郸城市","id":"12498"}]}},{"name":"四川省","id":"10032","citys":{"city":[{"name":"成都市","id":"10364"},{"name":"巴中市","id":"10365"},{"name":"达州市","id":"10366"},{"name":"德阳市","id":"10367"},{"name":"都江堰市","id":"10368"},{"name":"峨眉山市","id":"10369"},{"name":"涪陵市","id":"10370"},{"name":"广安市","id":"10371"},{"name":"广元市","id":"10372"},{"name":"九寨沟市","id":"10373"},{"name":"康定市","id":"10374"},{"name":"乐山市","id":"10375"},{"name":"泸州市","id":"10376"},{"name":"马尔康市","id":"10377"},{"name":"绵阳市","id":"10378"},{"name":"眉山市","id":"10379"},{"name":"南充市","id":"10380"},{"name":"内江市","id":"10381"},{"name":"攀枝花市","id":"10382"},{"name":"遂宁市","id":"10383"},{"name":"汶川市","id":"10384"},{"name":"西昌市","id":"10385"},{"name":"雅安市","id":"10386"},{"name":"宜宾市","id":"10387"},{"name":"自贡市","id":"10388"},{"name":"资阳市","id":"10389"},{"name":"崇州市","id":"27"},{"name":"重庆市","id":"80"},{"name":"广汉市","id":"93"},{"name":"阿坝州藏族自治州","id":"98"},{"name":"甘孜藏族自治州","id":"12540"},{"name":"凉山州","id":"12563"}]}},{"name":"台湾省","id":"10033","citys":{"city":[{"name":"台北市","id":"10390"},{"name":"基隆市","id":"10391"},{"name":"台南市","id":"10392"},{"name":"台中市","id":"10393"}]}},{"name":"天津市","id":"10034","citys":{"city":[{"name":"天津","id":"10394"},{"name":"红桥区","id":"19"},{"name":"河西区","id":"33"},{"name":"宝坻区","id":"42"},{"name":"河东区","id":"12474"},{"name":"南开区","id":"97"},{"name":"河北区","id":"105"},{"name":"塘沽区","id":"12481"},{"name":"东丽区","id":"12483"},{"name":"西青区","id":"12524"},{"name":"大港区","id":"12526"},{"name":"北辰区","id":"14491"}]}},{"name":"新疆省","id":"10035","citys":{"city":[{"name":"乌鲁木齐市","id":"10395"},{"name":"阿克苏市","id":"10396"},{"name":"阿勒泰市","id":"10397"},{"name":"阿图什市","id":"10398"},{"name":"博乐市","id":"10399"},{"name":"昌吉市","id":"10400"},{"name":"东山市","id":"10401"},{"name":"哈密市","id":"10402"},{"name":"和田市","id":"10403"},{"name":"喀什市","id":"10404"},{"name":"克拉玛依市","id":"10405"},{"name":"库车市","id":"10406"},{"name":"库尔勒市","id":"10407"},{"name":"奎屯市","id":"10408"},{"name":"石河子市","id":"10409"},{"name":"塔城市","id":"10410"},{"name":"吐鲁番市","id":"10411"},{"name":"伊宁市","id":"10412"},{"name":"伊梨市","id":"12512"},{"name":"巴音郭楞蒙古自治州","id":"12521"}]}},{"name":"西藏","id":"10036","citys":{"city":[{"name":"拉萨市","id":"10413"},{"name":"阿里市","id":"10414"},{"name":"昌都市","id":"10415"},{"name":"林芝市","id":"10416"},{"name":"那曲市","id":"10417"},{"name":"日喀则市","id":"10418"},{"name":"山南市","id":"10419"}]}},{"name":"云南省","id":"10037","citys":{"city":[{"name":"昆明市","id":"10420"},{"name":"大理市","id":"10421"},{"name":"保山市","id":"10422"},{"name":"楚雄市","id":"10423"},{"name":"大理市","id":"10424"},{"name":"东川市","id":"10425"},{"name":"个旧市","id":"10426"},{"name":"景洪市","id":"10427"},{"name":"开远市","id":"10428"},{"name":"临沧市","id":"10429"},{"name":"丽江市","id":"10430"},{"name":"六库市","id":"10431"},{"name":"潞西市","id":"10432"},{"name":"曲靖市","id":"10433"},{"name":"思茅市","id":"10434"},{"name":"文山市","id":"10435"},{"name":"西双版纳市","id":"10436"},{"name":"玉溪市","id":"10437"},{"name":"中甸市","id":"10438"},{"name":"昭通市","id":"10439"},{"name":"红河州","id":"48"},{"name":"德宏州市","id":"12479"},{"name":"普洱市","id":"12528"}]}},{"name":"浙江省","id":"10038","citys":{"city":[{"name":"杭州市","id":"10440"},{"name":"安吉市","id":"10441"},{"name":"慈溪市","id":"10442"},{"name":"定海市","id":"10443"},{"name":"奉化市","id":"10444"},{"name":"海盐市","id":"10445"},{"name":"黄岩市","id":"10446"},{"name":"湖州市","id":"10447"},{"name":"嘉兴市","id":"10448"},{"name":"金华市","id":"10449"},{"name":"临安市","id":"10450"},{"name":"临海市","id":"10451"},{"name":"丽水市","id":"10452"},{"name":"宁波市","id":"10453"},{"name":"瓯海市","id":"10454"},{"name":"平湖市","id":"10455"},{"name":"千岛湖市","id":"10456"},{"name":"衢州市","id":"10457"},{"name":"江山市","id":"10458"},{"name":"瑞安市","id":"10459"},{"name":"绍兴市","id":"10460"},{"name":"嵊州市","id":"10461"},{"name":"台州市","id":"10462"},{"name":"温岭市","id":"10463"},{"name":"温州市","id":"10464"},{"name":"舟山市","id":"10465"},{"name":"乐清市","id":"29"},{"name":"义乌市","id":"64"},{"name":"建德市","id":"12527"},{"name":"东阳市","id":"12538"},{"name":"海宁市","id":"12585"}]}},{"name":"安徽省","id":"10039","citys":{"city":[{"name":"合肥市","id":"10040"},{"name":"安庆市","id":"10041"},{"name":"蚌埠市","id":"10042"},{"name":"亳州市","id":"10043"},{"name":"巢湖市","id":"10044"},{"name":"滁州市","id":"10045"},{"name":"阜阳市","id":"10046"},{"name":"贵池市","id":"10047"},{"name":"淮北市","id":"10048"},{"name":"淮化市","id":"10049"},{"name":"淮南市","id":"10050"},{"name":"黄山市","id":"10051"},{"name":"九华山市","id":"10052"},{"name":"六安市","id":"10053"},{"name":"马鞍山市","id":"10054"},{"name":"宿州市","id":"10055"},{"name":"铜陵市","id":"10056"},{"name":"屯溪市","id":"10057"},{"name":"芜湖市","id":"10058"},{"name":"宣城市","id":"10059"},{"name":"明光市","id":"12480"},{"name":"天长市","id":"12490"},{"name":"池州市","id":"12556"}]}}]};
	
	return {
		getAreaArray:function(){
			return arr;
		},
		getCityArray:function(province){
			if(typeof province == "string"){
				for(var i =0,length=arr.province.length;i<length;i++){
					if(arr.province[i].name == province)
						return arr.province[i].citys;
				}
			}
			return null;
		}
	}
	
	
	
})