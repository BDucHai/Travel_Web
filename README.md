# Travel_Web
-Description travel, tour, blog, ...



Method	Endpoint	Mô tả	Request Body	Response
GET	/api/questions/destination/{destId}	Lấy danh sách question theo destination	–	List<QuestionDTO>
GET	/api/questions/status/{status}	Lấy danh sách question theo trạng thái (pending hoặc answered)	–	List<QuestionDTO>
POST	/api/questions/destination/{destId}	Thêm question mới cho một destination	json { "name":"Nguyễn Văn A", "email":"a@example.com", "avatarUrl":"http://...", "content":"Cho tôi hỏi về tour Đà Nẵng?" }	QuestionDTO


📌 Reply API
Method	Endpoint	Mô tả	Request Body	Response
POST	/api/questions/{questionId}/reply	Thêm reply cho một question	json { "name":"Admin", "email":"admin@travel.com", "avatarUrl":"http://...", "content":"Xin chào, tour Đà Nẵng hiện có khuyến mãi." }
