# Travel_Web
-Description travel, tour, blog, ...



Method	Endpoint	Mô tả	Request Body	Response
GET	/api/questions/destination/{destId}	Lấy danh sách question theo destination	–	List<QuestionDTO>
GET	/api/questions/status/{status}	Lấy danh sách question theo trạng thái (pending hoặc answered)	–	List<QuestionDTO>
POST	/api/questions/destination/{destId}	Thêm question mới cho một destination	json { "name":"Nguyễn Văn A", "email":"a@example.com", "avatarUrl":"http://...", "content":"Cho tôi hỏi về tour Đà Nẵng?" }	QuestionDTO


📌 Reply API
Method	Endpoint	Mô tả	Request Body	Response
POST	/api/questions/{questionId}/reply	Thêm reply cho một question	json { "name":"Admin", "email":"admin@travel.com", "avatarUrl":"http://...", "content":"Xin chào, tour Đà Nẵng hiện có khuyến mãi." }





Method	Endpoint	Mô tả	Request Body	Response
GET	/api/admin/destinations?region=NORTH&lang=en	Lấy tất cả destination (có filter theo region, ngôn ngữ)	–	List<DestinationResponse>
GET	/api/admin/destinations/{id}?lang=fr	Lấy chi tiết destination theo id (lang fr/en)	–	DestinationResponse
POST	/api/admin/destinations?lang=en	Tạo destination mới	DestinationRequest	DestinationResponse
PUT	/api/admin/destinations/{id}?lang=en	Cập nhật destination	DestinationRequest	DestinationResponse
PATCH	/api/admin/destinations/{id}/status?lang=en	Bật/tắt trạng thái destination	{ "isActive": true/false }	DestinationResponse
DELETE	/api/admin/destinations/{id}	Xóa destination	–	"Delete destination successfully"


📌 JSON mẫu
Tạo mới (POST /api/admin/destinations?lang=en)
json
{
  "countryId": 1,
  "region": "NORTH",
  "nameEn": "Ha Giang",
  "nameFr": "Ha Giang FR",
  "slugEn": "ha-giang",
  "slugFr": "ha-giang-fr",
  "shortDescriptionEn": "Beautiful mountain province",
  "shortDescriptionFr": "Province montagneuse magnifique",
  "contentEn": "Ha Giang is famous for its landscapes...",
  "contentFr": "Ha Giang est célèbre pour ses paysages...",
  "bestTimeToVisitEn": "October to December",
  "bestTimeToVisitFr": "Octobre à Décembre",
  "thumbnailUrl": "http://example.com/thumb.jpg",
  "heroImageUrl": "http://example.com/hero.jpg",
  "latitude": 22.8,
  "longitude": 104.9,
  "isFeatured": true,
  "isActive": true,
  "displayOrder": 1
}
Response (DestinationResponse)
json
{
  "id": 10,
  "countryId": 1,
  "countryName": "Vietnam",
  "region": "NORTH",
  "name": "Ha Giang",
  "slug": "ha-giang",
  "shortDescription": "Beautiful mountain province",
  "content": "Ha Giang is famous for its landscapes...",
  "bestTimeToVisit": "October to December",
  "thumbnailUrl": "http://example.com/thumb.jpg",
  "heroImageUrl": "http://example.com/hero.jpg",
  "latitude": 22.8,
  "longitude": 104.9,
  "isFeatured": true,
  "isActive": true,
  "displayOrder": 1
}
