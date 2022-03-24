$(document).ready(() => {
	getDataAgenda();
});



// ====================================== Get Agenda ===================================

const getDataAgenda = () =>{
	$.ajax({
		url:"http://localhost:3000/get/agenda",
		success : (result) =>{
			console.log(result.jadwal)
			let content;
			let number = 1
			let data = result
				data = data.jadwal
			data.forEach((agenda)=>{
				content += `<tr>
					          <th scope="row" class="text-center">${number}</th>
					          <td class="text-center"><input type="checkbox" data-id="${agenda.id}"
					          class="checked" data-row=${number}></td>
					          <td class="agenda">${agenda.kegiatan}</td>
					          <td class="deskripsi">${agenda.deskripsi}</td>
					          <td class="tanggal">${agenda.tanggal}</td>
					          <td class="penulis">${agenda.penulis}</td>
					        </tr>`
				number +=1;
			})
			
			$('tbody').html(content);

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

	let agenda = {
		kegiatan : addAgendaForm.kegiatan.value,
		tanggal  : addAgendaForm.tanggal.value,
		penulis  : addAgendaForm.penulis.value,
		deskripsi : addAgendaForm.deskripsi.value
	}

	await $.ajax({
		url:"http://localhost:3000/post/agenda",
		type : 'post',
		contentType :'application/json',
		data : JSON.stringify(agenda),
		dataType : 'json',
		success : (result)=>{	

			$('#modalAgenda').modal('toggle');

			addAgendaForm.kegiatan.value = ""
			addAgendaForm.tanggal.value = ""
			addAgendaForm.penulis.value = ""
			addAgendaForm.deskripsi.value = ""

			alert("Berhasil Menambahkan Data")

		},
		error : (err)=>{
			console.log(err)
			alert("Gagal Menambahkan Data")
		}
	})


	setTimeout(()=>{
		getDataAgenda();
	},5000)

	setTimeout(()=>{
		getDataAgenda();
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
 
    let agenda = tr.querySelector('.agenda').innerText;
    let deskripsi = tr.querySelector('.deskripsi').innerText;
    let tanggal = tr.querySelector('.tanggal').innerText;
    let penulis = tr.querySelector('.penulis').innerText;

 
    $('#kegiatan-agenda-edit').val(agenda)
    $('#deskripsi-agenda-edit').val(deskripsi)
    $('#tanggal-agenda-edit').val(tanggal)
    $('#penulis-agenda-edit').val(penulis)
    $('#id-agenda-edit').val(id_agenda[0])

    $('#modalEditAgenda').modal('toggle');
})


const updateAgendaForm = document.querySelector('.edit-agenda-modal')
updateAgendaForm.addEventListener('submit',async (e)=>{
	e.preventDefault();

	let agenda = {
		id : updateAgendaForm.id.value,
		kegiatan : updateAgendaForm.kegiatan.value,
		tanggal  : updateAgendaForm.tanggal.value,
		penulis  : updateAgendaForm.penulis.value,
		deskripsi : updateAgendaForm.deskripsi.value
	}

	
	await $.ajax({
		url:"http://localhost:3000/edit/agenda",
		type : 'post',
		contentType :'application/json',
		data : JSON.stringify(agenda),
		dataType : 'json',
		success : (result)=>{	

			$('#modalEditAgenda').modal('toggle')
			updateAgendaForm.id.value = ""
			updateAgendaForm.kegiatan.value = ""
			updateAgendaForm.tanggal.value = ""
			updateAgendaForm.penulis.value = ""
			updateAgendaForm.deskripsi.value = ""

			alert("Berhasil Memperbarui Data");
		},
		error : (err)=>{
			console.log(err)
			alert("Gagal Memperbarui Data")
		}
	})

	setTimeout(()=>{
		getDataAgenda();
	},5000)

	setTimeout(()=>{
		getDataAgenda();
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
    	let konfirmasi = confirm("Apakah anda yakin ingin menghapus agenda ini")

    	if(konfirmasi == true){
    		await $.ajax({
				url:"http://localhost:3000/delete/agenda",
				type : 'post',
				contentType :'application/json',
				data : JSON.stringify({id : id_agenda}),
				dataType : 'json',
				success : (result)=>{
					alert("Berhasil Menghapus Data");
				},
				error : (err)=>{
					console.log(err)
					alert("Gagal Menghapus Data")
				}
			})
    	}
    }

    setTimeout(()=>{
		getDataAgenda();
	},5000)

	setTimeout(()=>{
		getDataAgenda();
	},10000)
  
})

