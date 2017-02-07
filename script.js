/**
 * Created by kavuri on 2/4/2017.
 */
$(document).ready(function(){

$("#get-button").on('click',function(){
    var text;
    var k;
        $.ajax({
            url: '/products',
            contentType: 'application/json',
            success: function(response){
                var tbodyEl = $('tbody');
                tbodyEl.html('');
                for(k=0;k<response.products.length;k++){
                //response.products.forEach(function(product){
                    text = "";
                    text= "<tr>";
                    text += "<td class='id'>" + response.products[k].id+"</td>";
                    text +="<td><input type='text' class='name' value=' "+ response.products[k].name+"'> </td>";
                    text += "<td><input type='text' class='qty' value=' "+ response.products[k].qty+"'> </td>";
                    text+="<td>"+ "<button class='btn btn-primary updatebtn'>UPDATE</button>" +"</td>";
                    text+= "<td>" + "<button class='btn btn-danger deletebtn'>DELETE</button>" + "</td>";
                    text+="</tr>";
                    tbodyEl.append(text);
                }

            }
        });
    });
    //create/post

    $("#createId").on('submit',function(event){
        event.preventDefault();
        var getName = $("#getName");
        var getQty = $("#getQty");
        $.ajax({
            url: '/products',
            method:'POST',
            contentType:'application/json',
            data: JSON.stringify({name:getName.val(),qty:getQty.val()}),
            success: function(response){
                console.log("response in create "+response);
                getName.val('');
                getQty.val('');

                $("#get-button").click();
            }
        })
    });
    //UPDATE
    $('table').on('click','.updatebtn',function(){
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        var newName = rowEl.find('.name').val();
        var newQty = rowEl.find('.qty').val();
        $.ajax({
            url:'/products/' +id,
            method:'PUT',
            contentType:'application/json',
            data: JSON.stringify({name:newName,qty:newQty}),
            success:function(response){
                console.log("response in update is "+response);
                $("#get-button").click();
            }
        });
    });

    //delete
    $('table').on('click','.deletebtn',function(){
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
         $.ajax({
            url:'/products/' + id,
            method:'DELETE',
            contentType: 'application/json',
            success:function(response){
                console.log(response);
                $("#get-button").click();
            }
        });
    });

});

