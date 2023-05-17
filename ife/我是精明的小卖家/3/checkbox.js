const BaseCheckbox = function ({ options, ele, name, label, change }) {
  let list = [];
  ele.innerHTML = `<dt>
      <label for="${name}All">${label}：</label
      ><input id="${name}All" type="checkbox" />
    </dt><div class="checkbox-group">${options
      .map(
        (el) => `<dd>
        <input id="${el}" name="${name}" type="checkbox" value="${el}" />
        <label for="${el}">${el}</label>
      </dd>`
      )
      .join('')}</div>`;

  const checkboxList = document.querySelectorAll(`[name=${name}]`);
  const allEl = document.getElementById(`${name}All`);
  checkboxList.forEach((el) => {
    el.addEventListener('change', (e) => {
      if (e.target.checked) {
        list.push(e.target.value);
      } else {
        list.splice(list.indexOf(e.target.value), 1);
      }
      allEl.indeterminate = list.length > 0 && list.length < 3;
      allEl.checked = list.length === 3;
      change(list);
    });
  });
  allEl.addEventListener('click', (e) => {
    checkboxList.forEach((el) => (el.checked = e.target.checked));
    list = e.target.checked ? options : [];
    change(list);
  });
};
