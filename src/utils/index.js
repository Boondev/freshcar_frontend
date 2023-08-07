import { ElMessage } from 'element-plus'

export function successMsg(message){
	ElMessage({
		message: message,
		type: 'success',
	});
}

export function errorMsg(message){
	ElMessage({
		message: message,
		dangerouslyUseHTMLString: true,
		type: 'error',
	});
}

export function converDate(date){
	if(!date)
		return "";

	const options = {  year: 'numeric', month: 'short', day: 'numeric' };
	// console.log(date);
	return new Date(date).toLocaleDateString('en-US',options);
}