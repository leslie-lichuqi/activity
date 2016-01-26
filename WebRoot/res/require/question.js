define(['jquery'],function ($) {
	function Question(){
		
	}
	
	Question.prototype = {
		getBMI:function(height,weight){
			var BMI = 0;
			try{
				BMI = eval(weight/((height/100)*(height/100))).toFixed(2);
			}catch(e){
				return null;
			}
			return BMI;
		},
		getAnalyze:function(BMI){
			if(BMI<18.5){
				return {type:1,share:"很遗憾，您的BMI值为"+BMI+",亲您现在属于偏瘦体型。",content:"很遗憾，您的BMI值为<span class='red'>"+BMI+"</span>亲您现在属于<span class='red'>偏瘦体型</span>。",describe:"BMI<18.5：您的体重过轻，属于偏瘦体型，肥胖症相关疾病发生的危险性低（但其他疾病危险性增加）体重过低可能是由于营养摄入不足，也可能是由于体质问题导致的代谢旺盛。消瘦者要增加体重，首先要排除肠胃疾病、甲状腺等内分泌疾病。其次，通过做力量训练，服用一些易于吸收的营养补充剂，保持充足睡眠，都有助于体重增加。"};
			}else 
			if(BMI<24.9){
				return {type:2,share:"恭喜您，您的BMI值为"+BMI+"亲您现在很健康哦，请继续保持。",content:"恭喜您，您的BMI值为<span class='red'>"+BMI+"</span>亲您现在很健康哦，请继续保持。",describe:"BMI=18.5~24.9：恭喜您，你的体重很标准，良好的生活习惯非常重要，希望您通过合理运动和营养继续保持。一般说来，体重越标准，体型越匀称，体质也就越健康。除了骨骼和水分以外，人的体重主要受脂肪和肌肉的变化影响。为了了解您体内的肌肉和脂肪比例是否合理，您可以做一个体成分测试。"};
			}else if(BMI<29.9){
				return {type:3,share:"很遗憾，您的BMI值为"+BMI+"亲您现在体重超过标准，体型偏胖,建议您进行体重管理控制。",content:"很遗憾，您的BMI值为<span class='red'>"+BMI+"</span>亲您现在体重<span class='red'>超过标准，体型偏胖</span>,建议您进行体重管理控制。",describe:"BMI=25~29.9：您的体重超过标准，体型偏胖。超重的原因通常有两种，脂肪型超重和肌肉型超重，通过专业仪器测定体脂百分比能够辨明这两种不同的超重。如果是脂肪型超重，建议您通过合理运动和营养控制，达到标准目标。"};
			}else if(BMI<35){
				return {type:4,share:"很遗憾，您的BMI值为"+BMI+"亲您现在属于中度肥胖型,建议您进行体重管理控制。",content:"很遗憾，您的BMI值为<span class='red'>"+BMI+"</span>亲您现在属于<span class='red'>中度肥胖型</span>,建议您进行体重管理控制。",describe:"BMI=30~35：您属于中度肥胖型。肥胖症相关疾病发病的危险性中度增加。超重的原因通常有两种，脂肪型超重和肌肉型超重，通过专业仪器测定体脂百分比能够辨明这两种不同的超重。如果是脂肪型超重，建议您通过专业营养机构进行体重管理。"};
			}else if(BMI<39.9){
				return {type:5,share:"很遗憾，您的BMI值为"+BMI+"亲您现在属于重度肥胖型,建议您进行体重管理控制。",content:"很遗憾，您的BMI值为<span class='red'>"+BMI+"</span>亲您现在属于<span class='red'>重度肥胖型</span>,建议您进行体重管理控制。",describe:"BMI=35~39.9：您属于重度肥胖型。肥胖症相关疾病发病的危险性重度增加。超重的原因通常有两种，脂肪型超重和肌肉型超重，通过专业仪器测定体脂百分比能够辨明这两种不同的超重。如果是脂肪型超重，建议您通过专业营养机构进行体重管理。"};
			}else if(BMI>=40){
				return {type:6,share:"很遗憾，您的BMI值为"+BMI+"亲您现在属于极重度肥胖型,建议您进行体重管理控制。",content:"很遗憾，您的BMI值为<span class='red'>"+BMI+"</span>亲您现在属于<span class='red'>极重度肥胖型</span>,建议您进行体重管理控制。",describe:"BMI≥40.0：您属于极重度肥胖型。肥胖症相关疾病发病的危险性非常严重增加。超重的原因通常有两种，脂肪型超重和肌肉型超重，通过专业仪器测定体脂百分比能够辨明这两种不同的超重。如果是脂肪型超重，建议您通过专业营养机构进行体重管理。"};
			}
		}
	}
	
	return {
        Question:Question
    }
});
