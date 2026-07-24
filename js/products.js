const products = [
  {
    id: 1,
    name: "Souvenir Tee 1",
    colors: "Ivory / Black",
    price: 120000,
    image: "images/tee-1.jpg",
    sizes: ["S", "M", "L", "XL"],
    description: [
      "헤비웨이트 코튼 저지 원단을 사용한 오버사이즈 실루엣 티셔츠입니다.",
      "전면에 그래픽 프린트가 배치되어 있습니다.",
      "슬리브와 헴 라인은 리브 처리되어 형태를 오래 유지합니다.",
    ],
  },
  {
    id: 2,
    name: "Souvenir Tee 2",
    colors: "Ivory / Black",
    price: 120000,
    soldOut: true,
    image: "images/tee-1.jpg",
    sizes: ["S", "M", "L", "XL"],
    description: [
      "헤비웨이트 코튼 저지 원단을 사용한 오버사이즈 실루엣 티셔츠입니다.",
      "전면에 그래픽 프린트가 배치되어 있습니다.",
      "슬리브와 헴 라인은 리브 처리되어 형태를 오래 유지합니다.",
    ],
  },
  { id: 3, name: "Souvenir Tee 3", colors: "Ivory / Black", price: 120000, soldOut: true, image: "images/tee-1.jpg", sizes: ["S", "M", "L", "XL"] },
  { id: 4, name: "Souvenir Tee 4", colors: "Ivory / Black", price: 120000, image: "images/tee-1.jpg", sizes: ["S", "M", "L", "XL"] },
  { id: 5, name: "Souvenir Tee 5", colors: "Ivory / Black", price: 120000, image: "images/tee-1.jpg", sizes: ["S", "M", "L", "XL"] },
  { id: 6, name: "Souvenir Tee 6", colors: "Ivory / Black", price: 120000, image: "images/tee-1.jpg", sizes: ["S", "M", "L", "XL"] },
  { id: 7, name: "Souvenir Tee 7", colors: "Ivory / Black", price: 120000, image: "images/tee-1.jpg", sizes: ["S", "M", "L", "XL"] },
  { id: 8, name: "Souvenir Tee 8", colors: "Ivory / Black", price: 120000, image: "images/tee-1.jpg", sizes: ["S", "M", "L", "XL"] },
  { id: 9, name: "Souvenir Tee 9", colors: "Ivory / Black", price: 120000, soldOut: true, image: "images/tee-1.jpg", sizes: ["S", "M", "L", "XL"] },
  { id: 10, name: "Souvenir Tee 10", colors: "Ivory / Black", price: 120000, image: "images/tee-1.jpg", sizes: ["S", "M", "L", "XL"] },
  { id: 11, name: "Souvenir Tee 11", colors: "Ivory / Black", price: 120000, image: "images/tee-1.jpg", sizes: ["S", "M", "L", "XL"] },
  { id: 12, name: "Souvenir Tee 12", colors: "Ivory / Black", price: 120000, image: "images/tee-1.jpg", sizes: ["S", "M", "L", "XL"] },
];

function formatPrice(value) {
  return value.toLocaleString("ko-KR") + "원";
}
