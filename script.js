let items = [];

/* ADD NEW ITEM */
function addItem() {
  const index = items.length;

  items.push({
    desc: "",
    amount: 0,
    active: true
  });

  const div = document.createElement("div");
  div.className = "item-row";
  div.setAttribute("data-index", index);

  div.innerHTML = `
    <textarea
      placeholder="Description"
      oninput="items[${index}].desc = this.value">
    </textarea>

    <input
      type="number"
      placeholder="Amount"
      min="0"
      step="0.01"
      oninput="items[${index}].amount = parseFloat(this.value) || 0">

    <button type="button" onclick="removeItem(${index})">
      ❌ Remove
    </button>
  `;

  document.getElementById("itemsForm").appendChild(div);
}

/* REMOVE ITEM */
function removeItem(index) {
  items[index].active = false;

  const rows = document.querySelectorAll(".item-row");
  rows.forEach(row => {
    if (row.getAttribute("data-index") == index) {
      row.remove();
    }
  });

  updateInvoice();
}

/* UPDATE INVOICE PREVIEW */
function updateInvoice() {
  // Basic details
  invCompany.innerText = company.value || "";
  invAddress.innerText = address.value || "";
  invEmail.innerText = email.value || "";
  invNo.innerText = invoiceNo.value || "";
  invDate.innerText = date.value || "";

  // Bank details
  invBank.innerText = bankName.value || "";
  invAccName.innerText = accountName.value || "";
  invAccNo.innerText = accountNo.value || "";

  // Table body
  const body = document.getElementById("invoiceBody");
  body.innerHTML = "";

  let total = 0;

  items.forEach(item => {
    if (!item.active) return;
    if (!item.desc && item.amount === 0) return;

    total += item.amount;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="wrap">${item.desc}</td>
      <td class="right">$${item.amount.toFixed(2)}</td>
    `;
    body.appendChild(row);
  });

  // Grand total
  grandTotal.innerText = total.toFixed(2);
}

/* LOGO UPLOAD */
function loadLogo(event) {
  const file = event.target.files[0];
  if (!file) return;

  logoPreview.src = URL.createObjectURL(file);
  logoPreview.style.display = "block";
}

/* PRINT / DOWNLOAD PDF */
function printInvoice() {
  window.print();
}
