//hand enter password againt
$("#rePass").change(function (e) { 
    e.preventDefault();
    if($("#rePass").val() !== $("#Pass").val()) {
        $("#messageRePassword").html("false");
        $("#btnSubmit").attr('disabled','disabled');
    }else{
        $("#messageRePassword").html("");
        $('#btnSubmit').removeAttr('disabled');
    }
});