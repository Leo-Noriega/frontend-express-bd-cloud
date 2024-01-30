var idPais = 0;
var idEstado = 0;
var idMunicipio = 0;
var selectPaises = document.getElementById("paises");
var selectEstados = document.getElementById("estados");
var selectMunicipios = document.getElementById("municipios");

function getPaises() {
  fetch("http://localhost:3000/paises", {
    method: "GET",
    headers: {
      "Content-Type": "text/plain",
    },
  })
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      if (data.trim() !== "") {
        let parsedData = JSON.parse(data);
        selectPaises = document.getElementById("paises");
        parsedData.forEach((pais) => {
          let option = document.createElement("option");
          option.value = pais.id;
          option.text = pais.nombre;
          // Agarrar el id del pais y hacer la peticion a getEstados(id)
          selectPaises.addEventListener("change", (e) => {
            idPais = e.target.value;
            getEstados(idPais);
          });
          selectPaises.appendChild(option);
        });
      } else {
        console.error(
          "La respuesta está vacía o no es un formato JSON válido."
        );
      }
    })
    .catch(function (error) {
      console.error("Error en la solicitud:", error);
    });
}

function getPais(id) {
  fetch(`http://localhost:3000/paises/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getEstados(id) {
  console.log(`id pais : ${id}`);
  fetch(`http://localhost:3000/paises/${id}/estados`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      selectEstados = document.getElementById("estados");
      selectEstados.innerHTML = "";
      data.forEach((estado) => {
        let option = document.createElement("option");
        option.value = estado.id;
        option.text = estado.nombre;
        selectEstados.addEventListener("change", (e) => {
          idEstado = e.target.value;
          getMunicipios(idEstado);
        });
        selectEstados.appendChild(option);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

const getEstado = (id) => {
  fetch(`http://localhost:3000/estados/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getMunicipios = (id) => {
  fetch(`http://localhost:3000/estados/${id}/municipios`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      selectMunicipios = document.getElementById("municipios");
      selectMunicipios.innerHTML = "";
      data.forEach((municipio) => {
        let option = document.createElement("option");
        option.value = municipio.id;
        option.text = municipio.nombre;
        selectMunicipios.addEventListener("change", (e) => {
          idMunicipio = e.target.value;
          getMunicipio(idMunicipio);
        });
        selectMunicipios.appendChild(option);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getMunicipio = (id) => {
  fetch(`http://localhost:3000/municipios/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
