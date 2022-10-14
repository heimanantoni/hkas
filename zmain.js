$(document).ready(function () {
  //   button tabs
  let btnPayers = $("#btnPayers");
  let btnAddPayer = $("#btnAddPayer");
  // let btnEditPayer = $(".btnEditPayer");

  // banderas para funcionalidad del modalpara saber que tab eliminar

  //  boton del modal de eliminar tabs
  let btndModalDeleteTabs = $("#btndModalDeleteTabs");

  // etiquetas contenedoras de texto del modal
  let exampleModalLabel = $("#exampleModalLabel");
  let indicationBtnModal = $("#indicationBtnModal");

  // contenedores dinamicos
  let ulTabs = $("#pills-tab");
  let formTablePayer = $("#pills-home");
  let newPayer = $("#pills-profile");
  let editPayer = $("#pills-contact");
  let formNewPayer = $("#formNewPayer");

  // btn o evento open modal (tigger click)
  let btnOpenModal = $("#btnModalPayers");

  // validaciones del los formularios--------------------------------------------
  $("#fielname").hide();
  $("#fielneic").hide();
  $("#fielnameEdit").hide();
  $("#fielneicEdit").hide();
  const expressions = {
    neic: /^[a-zA-ZÀ-ÿ0-9\s]{1,30}$/, // Letras, numeros,pueden llevar acentos, espacios
  };

  var fiels = {
    name: false,
    neic: false,
    nameEdit: false,
    neicEdit: false,
  };

  function validateform(e) {
    $("#messageErrorNewPayer").hide();
    $("#messageErrorEditPayer").hide();

    let parameter = e.target.name;
    if (parameter === "name") {
      validateParam(expressions.neic, e.target, "name");
    } else if (parameter === "neic") {
      validateParam(expressions.neic, e.target, "neic");
    } else if (parameter === "nameEdit") {
      validateParam(expressions.neic, e.target, "nameEdit");
    } else if (parameter === "neicEdit") {
      validateParam(expressions.neic, e.target, "neicEdit");
    }
  }

  function validateParam(expresion, input, fiel) {
    if (expresion.test(input.value.trim())) {
      $(`#${fiel}`).removeClass("errorInput");
      $(`#fiel${fiel}`).hide();
      fiels[fiel] = true;
    } else {
      $(`#${fiel}`).addClass("errorInput");
      $(`#fiel${fiel}`).show();

      fiels[fiel] = false;
    }
  }
  let name = $("#name");
  let neic = $("#neic");
  let nameEdit = $("#nameEdit");
  let neicEdit = $("#neicEdit");

  name.keyup(validateform);
  name.blur(validateform);
  neic.keyup(validateform);
  neic.blur(validateform);

  nameEdit.keyup(validateform);
  nameEdit.blur(validateform);
  neicEdit.keyup(validateform);
  neicEdit.blur(validateform);

  // -------------------------------------------------------------------------------

  // date picker

  $(".datePicker").datepicker({
    format: "dd/mm/yyyy",
    weekStart: 2,
    maxViewMode: 0,
    beforeShowDay: function (date) {
      if (date.getMonth() == new Date().getMonth())
        switch (date.getDate()) {
          case 4:
            return {
              tooltip: "Example tooltip",
              classes: "active",
            };
          case 8:
            return false;
          case 12:
            return "green";
        }
    },
  });

  // ---------------------funcion para agregar el  tabs payers junto con su formTablePayer ----------------------------
  // aqui aparte del tab li debo hacer que se aparesca el div de una vez //

  btnPayers.click(function () {
    let tabsPayers = $("#pills-tab li#tabPayer");
    // console.log(tabsPayers.length);
    if (tabsPayers.length === 1) {
      exampleModalLabel.html("el tab Payers ya se encuentra creado");
      indicationBtnModal.html("puede cerrar el modal o eliminar el tab payers");
      btndModalDeleteTabs.attr("data-tab", "tabPayer");
      btnOpenModal.trigger("click");
    } else {
      ulTabs.append(
        `<li class="nav-item" id="tabPayer"><a class="nav-link eachTabs colorHkas"  id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Payers</a></li>`
      );

      // esto es como si estuviese clicleando el tab para que se abra
      $('#tabPayer a[href="#pills-home"]').tab("show");
    }

    $('#tabPayer a[href="#pills-home"]').tab("show");
  });

  //------------funcion para agregar el tab newPayer----------------------------
  btnAddPayer.click(function () {
    let tabsNewPayers = $("#pills-tab li#tabNewPayer");
    if (tabsNewPayers.length === 1) {
      exampleModalLabel.html("el tab New Payer ya se encuentra creado");
      indicationBtnModal.html(
        "puede cerrar el modal o eliminar el tab New Payer"
      );
      btndModalDeleteTabs.attr("data-tab", "tabNewPayer");
      btnOpenModal.trigger("click");
    } else {
      ulTabs.append(
        `<li class="nav-item" id="tabNewPayer"><a class="nav-link eachTabs colorHkas" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">New Payer</a></li>`
      );

      // esto es como si estuviese clicleando el tab para que se abra
      $('#tabNewPayer a[href="#pills-profile"]').tab("show");
    }
  });

  // --edit---funcion para agregar el tab editPayer y de una vez editar datos guardados en el formulario de editar---------------------------------------------------------
  let idEdit;
  let auxPosition;
  $(document).on("click", 'i[name="btnEditPayer"]', function (e) {
    fiels["nameEdit"] = true;
    fiels["neicEdit"] = true;
    // fiels.nameEdit = true;
    // fiels.neicEdit = true;

    let payers = JSON.parse(localStorage.getItem("payers"));

    let tabsEditPayers = $("#pills-tab li#tabEditPayer");
    if (tabsEditPayers.length === 1) {
      exampleModalLabel.html("el tab Edit Payer ya se encuentra creado");
      indicationBtnModal.html(
        "puede cerrar el modal o eliminar el tab Edit payer"
      );
      btndModalDeleteTabs.attr("data-tab", "tabEditPayer");
      btnOpenModal.trigger("click");
    } else {
      idEdit = parseInt(this.id);
      ulTabs.append(
        `<li class="nav-item" id="tabEditPayer"><a class="nav-link eachTabs colorHkas" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false" >Edit Payer</a></li>`
      );

      // esto es como si estuviese clicleando el tab para que se abra
      $('#tabEditPayer a[href="#pills-contact"]').tab("show");

      let auxPayer = payers.find((el) => idEdit === el.id);
      auxPosition = payers.findIndex((el) => idEdit === el.id);

      $("#editId").html(`{${idEdit}}-United Health Care`);

      $("#nameEdit").val(auxPayer.name);
      $("#neicEdit").val(auxPayer.neic);
      $("#taxEdit").val(auxPayer.tax);
      $("#contractEdit").val(auxPayer.contract);
      $("#effectiveEdit").val(auxPayer.effective);
      $("#expirationEdit").val(auxPayer.expiration);
      $("#switch1Edit").prop("checked", auxPayer.switch1);
      $("#reviewEdit").val(auxPayer.review);
      $("#address1Edit").val(auxPayer.address1);
      $("#address2Edit").val(auxPayer.address2);
      $("#cityEdit").val(auxPayer.city);
      $("#stateEdit").val(auxPayer.state);
      $("#countyEdit").val(auxPayer.county);
      $("#zipEdit").val(auxPayer.zip);
      $("#countryEdit").val(auxPayer.country);
      $("#emailEdit").val(auxPayer.email);
      $("#numberPhoneEdit").val(auxPayer.numberPhone);
      $("#extEdit").val(auxPayer.ext);
      $("#faxNumberEdit").val(auxPayer.faxNumber);
    }
  });
  // fin on click editPayer

  // submit de los datos editados y actualizados----------------------------------------------
  $("#formEditPayer").submit(function (e) {
    if (fiels.nameEdit && fiels.neicEdit) {
      let payers = JSON.parse(localStorage.getItem("payers"));
      // console.log(auxPosition);

      payers.splice(auxPosition, 1, {
        id: idEdit,
        name: $("#nameEdit").val(),
        neic: $("#neicEdit").val(),
        tax: $("#taxEdit").val(),
        contract: $("#contractEdit").val(),
        effective: $("#effectiveEdit").val(),
        expiration: $("#expirationEdit").val(),
        switch1: $("#switch1Edit").prop("checked"),
        review: $("#reviewEdit").val(),
        address1: $("#address1Edit").val(),
        address2: $("#address2Edit").val(),
        city: $("#cityEdit").val(),
        state: $("#stateEdit").val(),
        county: $("#countyEdit").val(),
        zip: $("#zipEdit").val(),
        country: $("#countryEdit").val(),
        email: $("#emailEdit").val(),
        numberPhone: $("#numberPhoneEdit").val(),
        ext: $("#extEdit").val(),
        faxNumber: $("#faxNumberEdit").val(),
      });

      localStorage.setItem("payers", JSON.stringify(payers));
      $("#pills-tab li#tabEditPayer").remove();
      deleteLastTab();

      $("#modalMessage").html("successfully updated");
      $("#btnModalSuccessful").trigger("click");

      $("#formEditPayer").trigger("reset");
      e.preventDefault();
    } else {
      e.preventDefault();
      $("#messageErrorEditPayer").css("display", "flex");
    }
  });
  // fin de los datos actualizados

  // para que se actualicen los datos en la tabla despues de editarlos porqque en la tabla estaran datos con diferente id
  function updateTable() {
    let payers = JSON.parse(localStorage.getItem("payers"));
    let tBody = $("#tBody");
    tBody.html("");

    if (localStorage.getItem("payers") === null) {
      return false;
    } else {
      let payersTable = "";
      for (let i = 0; i < payers.length; i++) {
        let ID = i + 1;
        let id = payers[i].id;
        let name = payers[i].name;
        let effective = payers[i].effective;
        let expiration = payers[i].expiration;
        let contract = payers[i].contract;

        payersTable += `<tr>
                        <th scope="row">${ID}</th>
                        <td>${name}</td>
                        <td>${effective}</td>
                        <td>${expiration}</td>
                        <td>${contract}</td>
                        <td><i name="btnEditPayer" class="fa fa-pen iCursor" id="${id}"></i> <i class="fa fa-gear"></i> <i name="btnDeletePayer" class="fa fa-trash  iCursor" id="${id}"></i> </td>
                     </tr>`;
      }
      tBody.html(payersTable);
    }
  }

  //--eliminar tab-boton del modal para eliminar cualquier tabs que ya este creado-------------------------------------------------------------
  btndModalDeleteTabs.click(function () {
    let prop = btndModalDeleteTabs.data();
    if (prop.tab !== undefined) {
      $(`#pills-tab li#${prop.tab}`).remove();
      deleteLastTab();
    }
  });
  // funcion para eliminar todos los contenedores dinamicos si ya no existe ningun tab

  function deleteLastTab() {
    let tabsCantidad = $("#pills-tab li");
    // console.log(tabsCantidad.length);
    if (tabsCantidad.length > 0) {
      $("#pills-tab li:first-child a").tab("show");
    } else if (tabsCantidad.length === 0) {
      $("#nav-tabContent div[name=tabs]")
        .removeClass("active")
        .removeClass("show");
    }
  }
  //------------delete payer--------------------------------------------------------------------------------------
  let idDelete;
  $(document).on("click", 'i[name="btnDeletePayer"]', function (e) {
    idDelete = parseInt(this.id);
    $("#btnModalDelete").trigger("click");
  });

  $("#deletePayer").click(function () {
    let payers = JSON.parse(localStorage.getItem("payers"));
    let auxPosition = payers.findIndex((el) => idDelete === el.id);
    payers.splice(auxPosition, 1);
    localStorage.setItem("payers", JSON.stringify(payers));
    updateTable();
  });

  //---------clear formNew-----------------------------------------
  $(document).on("click", 'div[id="clearNew"]', function (e) {
    formNewPayer.trigger("reset");
  });

  //---------clear formEdit----------------------------------------
  $(document).on("click", 'div[name="clearEdit"]', function (e) {
    $("#formEditPayer").trigger("reset");
  });

  // submit formulario new payers
  formNewPayer.submit(function (e) {
    if (fiels.name && fiels.neic) {
      fiels["name"] = false;
      fiels["neic"] = false;
      let name = $("#name").val();
      let neic = $("#neic").val();
      let tax = $("#tax").val();
      let contract = $("#contract").val();
      let effective = $("#effective").val();
      let expiration = $("#expiration").val();
      let switch1 = $("#switch1").prop("checked");
      let review = $("#review").val();
      let address1 = $("#address1").val();
      let address2 = $("#address2").val();
      let city = $("#city").val();
      let state = $("#state").val();
      let county = $("#county").val();
      let zip = $("#zip").val();
      let country = $("#country").val();
      let email = $("#email").val();
      let numberPhone = $("#numberPhone").val();
      let ext = $("#ext").val();
      let faxNumber = $("#faxNumber").val();

      let payer = {
        id: Date.now(),
        name,
        neic,
        tax,
        contract,
        effective,
        expiration,
        switch1,
        review,
        address1,
        address2,
        city,
        state,
        county,
        zip,
        country,
        email,
        numberPhone,
        ext,
        faxNumber,
      };

      auxTabNewPayer = null;

      if (localStorage.getItem("payers") === null) {
        $("#modalMessage").html("successfully save");
        $("#btnModalSuccessful").trigger("click");
        let payers = [];
        payers.push(payer);
        localStorage.setItem("payers", JSON.stringify(payers));

        // newPayer.hide();
        $("#pills-tab li#tabNewPayer").remove();

        deleteLastTab();
      } else {
        $("#modalMessage").html("successfully save");
        $("#btnModalSuccessful").trigger("click");
        let payers = JSON.parse(localStorage.getItem("payers"));
        payers.push(payer);
        localStorage.setItem("payers", JSON.stringify(payers));

        $("#pills-tab li#tabNewPayer").remove();

        deleteLastTab();
      }
      e.preventDefault();
      formNewPayer.trigger("reset");
    } else {
      e.preventDefault();
      $("#messageErrorNewPayer").css("display", "flex");
    }
  });

  // click para actualizar los payers ya que no se actualizan solos
  $("#btnUpdateTable").click(function () {
    updateTable();
  });

  // llamado a la function para que se me actualice los payer en la tabla al inicio de la carga
  updateTable();
  $("#formSearch").submit(function (e) {
    let payers = JSON.parse(localStorage.getItem("payers"));
    let selectSearch = $("#selectSearch").val();
    let inputSearch = $("#inputSearch").val();
    let dateSearch = $("#dateSearch").val();
  });

  // ---------------------------------fin ready-----------------------------------------------------------------
});
