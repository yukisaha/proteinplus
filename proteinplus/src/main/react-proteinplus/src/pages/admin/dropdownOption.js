let optionCount = 0; // 옵션 고유 번호

function addDropdown() {
  const container = document.getElementById("dropdownOptionContainer");
  const dropdownIndex = container.children.length + 1;
  const dropdownId = `dropdown-${dropdownIndex}`;

  const select = document.createElement("select");
  select.id = dropdownId;

  addOptionToDropdown(select, `기본 옵션`, `option${optionCount}`, "0원");

  // 옵션 추가 버튼
  const addButton = document.createElement("button");
  addButton.textContent = "옵션 추가";
  addButton.classList.add("btn-primary");
  addButton.onclick = function () {
    const optionName = prompt("추가할 옵션의 이름을 입력하세요:", "");
    const optionPrice = prompt("추가할 옵션의 가격을 입력하세요:", "");
    if (optionName && optionPrice) {
      addOptionToDropdown(
        select,
        optionName,
        `option${optionCount++}`,
        `${optionPrice}원`
      );
    }
  };

  // 옵션 수정 버튼
  const editButton = document.createElement("button");
  editButton.textContent = "옵션 수정";
  editButton.onclick = function () {
    if (select.selectedIndex >= 0) {
      const newName = prompt("수정할 옵션의 새 이름을 입력하세요:", "");
      const newPrice = prompt("수정할 옵션의 새 가격을 입력하세요:", "");
      if (newName && newPrice) {
        editOptionInDropdown(select, newName, newPrice);
      }
    }
  };

  // 선택한 옵션 제거 버튼
  const removeSelectedButton = document.createElement("button");
  removeSelectedButton.textContent = "선택한 옵션 제거";
  removeSelectedButton.onclick = function () {
    if (select.selectedIndex >= 0) {
      select.remove(select.selectedIndex);
    }
  };

  // 드롭다운 목록 제거 버튼
  const removeDropdownButton = document.createElement("button");
  removeDropdownButton.textContent = "옵션목록 제거";
  removeDropdownButton.onclick = function () {
    container.removeChild(dropdownContainer);
  };

  const dropdownContainer = document.createElement("div");
  dropdownContainer.classList.add("dropdown-group");
  dropdownContainer.appendChild(select);
  dropdownContainer.appendChild(addButton);
  dropdownContainer.appendChild(editButton);
  dropdownContainer.appendChild(removeSelectedButton);
  dropdownContainer.appendChild(removeDropdownButton);
  container.appendChild(dropdownContainer);
}

// 드롭다운 옵션 추가 함수
function addOptionToDropdown(dropdown, optionText, optionValue, optionPrice) {
  const option = document.createElement("option");
  option.text = `${optionText} (${optionPrice})`;
  option.value = optionValue;
  dropdown.add(option);
}

// 드롭다운 선택옵션 수정 함수
function editOptionInDropdown(dropdown, newName, newPrice) {
  dropdown.options[dropdown.selectedIndex].text = `${newName} (${newPrice}원)`;
}

// 페이지 로드 시 드롭다운 추가
window.onload = addDropdown;
