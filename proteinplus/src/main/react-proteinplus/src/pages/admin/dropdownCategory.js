document.addEventListener("DOMContentLoaded", function () {
  // 전체 카테고리와 각 세부 카테고리 목록을 포함하는 객체
  const mainCategoryDropdown = document.getElementById("mainCategory");

  // 전체 카테고리 드롭다운 옵션 추가
  Object.keys(categories).forEach(function (category) {
    mainCategoryDropdown.options[mainCategoryDropdown.options.length] =
      new Option(category, category);
  });
});

// 선택된 전체 카테고리에 따라 세부 카테고리 드롭다운을 업데이트하는 함수
function updateSubcategories() {
  const mainCategoryDropdown = document.getElementById("mainCategory");
  const subCategoryDropdown = document.getElementById("subCategory");
  const selectedCategory = mainCategoryDropdown.value;

  // 세부 카테고리 드롭다운 초기화
  subCategoryDropdown.length = 0;
  subCategoryDropdown.options[0] = new Option("세부 카테고리 선택", "");

  // 선택된 전체 카테고리의 세부 카테고리 목록을 가져옴
  if (selectedCategory && categories[selectedCategory]) {
    categories[selectedCategory].forEach(function (subCategory) {
      subCategoryDropdown.options[subCategoryDropdown.options.length] =
        new Option(subCategory, subCategory);
    });
  }
}

// 전체 카테고리와 세부 카테고리의 매핑을 저장하는 객체
const categories = {
  닭가슴살: [
    "프로",
    "스팀/소프트",
    "소스닭가슴살",
    "스테이크",
    "소시지/햄",
    "저염/염분무첨가",
    "생 닭가슴살",
    "훈제",
    "볼/큐브",
    "슬라이스",
    "냉장/실온보관",
    "핫바/어묵바",
    "스낵/칩",
    "크리스피",
    "육포",
  ],
  도시락·볶음밥: [
    "볶음밥",
    "다이어트 도시락",
    "주먹밥/김밥",
    "더담은 도시락",
    "간편 도시락",
    "덮밥/컵밥",
    "즉석밥/곤약밥",
    "간편 죽",
    "비건 도시락",
  ],
  소고기: ["스테이크/볼", "설도/홍두깨살", "국거리/조리용"],
  샐러드·과일: ["알뜰샐러드", "토핑샐러드", "과일", "야채믹스"],
};
