
document.addEventListener('DOMContentLoaded', function () {
  fetchData();
});



const deleteData = async (lat, lng) => {
  const formData = new FormData();
  formData.append('lat', lat);
  formData.append('lng', lng);


  const response = await fetch('delete.php', {
    method: 'POST',
    body: formData
  });
  const data = await response.json();
  console.log(data);
  fetchData()
}


function fetchData() {
  const table = document.getElementById('tableData');
  table.innerHTML = '';
  fetch('get.php').then(response => response.json())
    .then(data => {


      let index = 1;

      data.forEach(item => {
        var marker = L.marker([item.latitude, item.longitude], { draggable: true });
        map.addLayer(marker);

        const row = document.createElement('tr');

        const cell1 = document.createElement('td');
        const cell2 = document.createElement('td');
        const cell3 = document.createElement('td');
        const cell4 = document.createElement('td');
        const cell5 = document.createElement('td');
        const cell6 = document.createElement('td');

        cell1.textContent = index;
        cell2.textContent = item.nama;
        cell3.textContent = item.deskripsi;
        cell4.textContent = item.kategori;
        cell5.textContent = item.rating;
        cell6.textContent = item.alamat;

        row.append(cell1, cell2, cell3, cell4, cell5, cell6);
        table.append(row);

        index++


        marker.on('dragstart', function (e) {
          const position = marker.getLatLng();
          initialLatitude = position.lat;
          initialLongitude = position.lng;
          console.log(initialLatitude);
          console.log(initialLongitude);
        });
        marker.on('dragend', function (e) {
          const position = marker.getLatLng();
          latitude = position.lat;
          longitude = position.lng;
          const modalUpdate = document.getElementById('modalUpdate');
          const closeModalUpdate = document.getElementById('closeModalUpdate');
          closeModalUpdate.addEventListener('click', () => {
            modalUpdate.classList.add('hidden')
          })
          modalUpdate.classList.toggle('hidden');
        });

        const modalDelete = document.getElementById('modalDelete');
        const modalCloseButton = document.getElementById('modalclosebutton');
        function onMarkerRightClick(e) {

          e.originalEvent.preventDefault();
          modalDelete.classList.remove('hidden');
          latitude = e.latlng.lat.toString();
          longitude = e.latlng.lng.toString();
          console.log(e)
        }

        marker.on('contextmenu', onMarkerRightClick);
        modalCloseButton.addEventListener('click', (e) => {
          modalDelete.classList.add('hidden');

        })



        var popupContent = `
              <h3>${item.nama}</h3>
              <p><strong>Deskripsi:</strong> ${item.deskripsi}</p>
              <p><strong>Kategori:</strong> ${item.kategori}</p>
              <p><strong>Rating:</strong> ${item.rating}</p>
              <p><strong>Alamat:</strong> ${item.alamat}</p>
              `;
        marker.bindPopup(popupContent);

      });
    })
    .catch(error => console.error('Error:', error));
}


//handle form delete
const formDelete = document.getElementById('formDelete')
formDelete.addEventListener('submit', (e) => {
  const modalDelete = document.getElementById('modalDelete');
  modalDelete.classList.toggle('hidden');
  deleteData(latitude, longitude)



})