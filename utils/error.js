 const ErrorHandler =(status,message)=>{
const err = new Error()

err.message=message;
err.status=status;

return err ;

}
module.exports={ErrorHandler}