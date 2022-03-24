$(document).ready(() => {
	getDataAkun();
});

// ====================================== Get Agenda ===================================

const getDataAkun = () =>{
	$.ajax({
		url:"http://localhost:3000/get/akun",
		success : (result) =>{
			console.log(result)
			let content;
			let number = 1
			let data = result
				data = data.akun
			data.forEach((akun)=>{
				let date = new Date(akun.dibuat.seconds * 1000)
				date = date.toDateString()

				content += `<tr>
					          <th scope="row" class="text-center">${number}</th>
					          <td class="text-center"><input type="checkbox" data-id="${akun.id}"
					          class="checked" data-row=${number}></td>
					          <td class="username">${akun.username}</td>
					          <td class="password">${akun.password}</td>
					          <td class="name">${akun.name}</td>
					          <td class="role">${akun.role}</td>
					          <td class="dibuat">${date}</td>
					        </tr>`
				number +=1;
			})
			
			$('.table-data-akun').html(content);

			// jika tombol checked di tekan
	        $('.check-all').on('change', function () {
	            if (this.checked) {
	                $('.checked').attr('checked', 'checked');
	            } else {
	                $('.checked').removeAttr('checked');
	            }
	        })

		},
		error : (err) =>{
			console.log(err);
		}
	})

}



// ====================================== Add Agenda ===================================

const addAgendaForm = document.querySelector('.add')
addAgendaForm.addEventListener('submit',async(e)=>{
	e.preventDefault();

	let akun = {
		username : addAgendaForm.username.value,
		password  : addAgendaForm.password.value,
		name  : addAgendaForm.name.value,
		role : addAgendaForm.role.value
	}

	await $.ajax({
		url:"http://localhost:3000/post/akun",
		type : 'post',
		contentType :'application/json',
		data : JSON.stringify(akun),
		dataType : 'json',
		success : (result)=>{	

			$('#modalAkun').modal('toggle');

			addAgendaForm.username.value = ""
			addAgendaForm.password.value = ""
			addAgendaForm.name.value = ""
			addAgendaForm.role.value = ""

			alert("Berhasil Menambahkan Akun")

		},
		error : (err)=>{
			console.log(err)
			alert("Gagal Menambahkan Akun")
		}
	})


	setTimeout(()=>{
		getDataAkun();
	},5000)

	setTimeout(()=>{
		getDataAkun();
	},10000)
})

// ====================================== Edit Agenda ===================================

$("#edit-akun").on('click',function(){

	// mendapatkan id
	let id = document.querySelectorAll('.checked');
	let id_agenda = []
	let row; 
    id.forEach((id) => {
        if (id.checked) {
            id_agenda.push(id.getAttribute('data-id'));
            row = id.getAttribute('data-row')
        }
    })


    // melakukan chek
    if(id_agenda.length >1){
    	alert("Tidak Bisa memilih lebih dari 1 data")
  		return false;
    }else if(id_agenda.length == 0){
    	alert("Setidaknya harus memilih 1 data untuk di edit")
  		return false;
    }

    let tr = document.querySelectorAll('tr')[row]
 
    let username = tr.querySelector('.username').innerText;
    let password = tr.querySelector('.password').innerText;
    let name = tr.querySelector('.name').innerText;
    let role = tr.querySelector('.role').innerText;
    console.log(role)

 	$('#akun-id').val(id_agenda[0])
    $('#akun-username').val(username)
    $('#akun-password').val(password)
    $('#akun-name').val(name)

   	if(role == "Admin"){
   		$("#role-admin").attr("selected","")
   	}else{
   		$("#role-user").attr("selected","")
   	}

    $('#modalAkunEdit').modal('toggle');
})


const updateAgendaForm = document.querySelector('.update')
updateAgendaForm.addEventListener('submit',async (e)=>{
	e.preventDefault();

	let akun = {
		id : updateAgendaForm.id.value,
		username  	: updateAgendaForm.username.value,
		password  	: updateAgendaForm.password.value,
		name  		: updateAgendaForm.name.value,
		role 		: updateAgendaForm.role.value
	}

	
	await $.ajax({
		url:"http://localhost:3000/edit/akun",
		type : 'post',
		contentType :'application/json',
		data : JSON.stringify(akun),
		dataType : 'json',
		success : (result)=>{	

			$('#modalAkunEdit').modal('toggle');

			addAgendaForm.username.value = ""
			addAgendaForm.password.value = ""
			addAgendaForm.name.value = ""
			addAgendaForm.role.value = ""

			alert("Berhasil Memperbarui Akun")

		},
		error : (err)=>{
			console.log(err)
			alert("Gagal Memperbarui Akun")
		}
	})

	setTimeout(()=>{
		getDataAkun();
	},5000)

	setTimeout(()=>{
		getDataAkun();
	},10000)
})

// ================================= Delete Agenda ================================
$("#hapus-akun").on('click',async function(){
	console.log(200)

	// mendapatkan id
	let id = document.querySelectorAll('.checked');
	let id_agenda = []
    id.forEach((id) => {
        if (id.checked) {
            id_agenda.push(id.getAttribute('data-id'));
        }
    })


    // melakukan chek
	if(id_agenda.length == 0){
    	alert("Setidaknya harus memilih 1 data untuk di hapus")
    }else{
    	let konfirmasi = confirm("Apakah anda yakin ingin menghapus akun ini")

    	if(konfirmasi == true){
    		await $.ajax({
				url:"http://localhost:3000/delete/akun",
				type : 'post',
				contentType :'application/json',
				data : JSON.stringify({id : id_agenda}),
				dataType : 'json',
				success : (result)=>{
					alert("Berhasil Menghapus Akun");
				},
				error : (err)=>{
					console.log(err)
					alert("Gagal Menghapus Akun")
				}
			})
    	}
    }

    setTimeout(()=>{
		getDataAkun();
	},5000)

	setTimeout(()=>{
		getDataAkun();
	},10000)
  
})


