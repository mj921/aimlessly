const BaseCheckbox = function ({
  options,
  ele,
  name,
  label,
  change,
  defaultValue = [],
}) {
  this.options = options;
  this.ele = ele;
  this.name = name;
  this.label = label;
  this.change = change;
  this.render(defaultValue);
};

BaseCheckbox.prototype.render = function (defaultValue = []) {
  const { options, ele, name, label, change } = this;
  let list = Array.from(new Set(defaultValue)).filter((el) =>
    options.includes(el)
  );
  ele.innerHTML = `<dt>
      <label for="${name}All">${label}：</label
      ><input id="${name}All" type="checkbox" ${
    list.length === options.length ? 'checked' : ''
  } />
    </dt><div class="checkbox-group">${options
      .map(
        (el) => `<dd>
        <input id="${el}" name="${name}" type="checkbox" value="${el}" ${
          defaultValue.includes(el) ? 'checked' : ''
        } />
        <label for="${el}">${el}</label>
      </dd>`
      )
      .join('')}</div>`;

  const checkboxList = document.querySelectorAll(`[name=${name}]`);
  const allEl = document.getElementById(`${name}All`);
  allEl.indeterminate = list.length > 0 && list.length < options.length;
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
