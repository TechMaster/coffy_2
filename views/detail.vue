<template lang="html">
	<div id="detail">
		<div class="header" >
			<myheader></myheader>
		</div>
		<section class="container-fluid tab">
			<div class="container mieuta">
				<div class="row">
					<div class="col-xs-12 col-sm-12 col-md-6">
						<div class="image-product">
							<img :src="location.image" class="width-img-100">
						</div>
					</div>
					<div class="col-xs-12 col-sm-6 col-md-6">
						<div class="diachi">
							<ol class="breadcrumb">
								<li><a href="#">Hà Nội <i class="fa fa-angle-right"></i></a></li>
								<li><a href="#">{{ location.district }}<i class="fa fa-angle-right"></i></a></li>
								<!--<li class="active-breadcrumb"><a href="#">Khu vực Đại học Quốc Gia</a></li>-->
							</ol>
						</div>
						<h2>{{ location.name }}</h2>
						<div class="description-product">
							<p><i class="fa fa-location-arrow"></i><span>{{ location.address }},{{ location.district }}, Hà Nội</span></p>
							<hr/>
							<div class="course-detail-tittle">
								<div class="course-info-numberStd">
									<div>
										<p><span class="counter" data-count="9.6">0,0</span>Vị trí</p>
										<!--<p><span class="counter" data-count="6.9">0.0</span>Không gian</p>-->
										<p><span class="counter" data-count="9.6">0.0</span>Phục vụ</p>
										<!--<p><span class="counter" data-count="9.6">0.0</span>/3 bình luận</p>-->
										<p><span class="counter" data-count="9.6">0.0</span>Giá cả</p>
									</div>
									<div>
										<p><span class="counter" id="index" :data-count="location.rate">0.0</span>Chất lượng</p>
									</div>
								</div>
							</div>
							<hr/>
							<p><i class="fa fa-clock-o"></i><span>{{ location.octime }}<span style="color: #d32323; font-weight: bold">Đang hoạt động</span> </span>
							</p>
							<p><i class="fa fa-tags"></i><span>30.000đ - 60.000đ</span></p>
							<p><i class="fa fa-phone"></i><span>0433.200.2790</span></p>
						</div>
					</div>
				</div>
				<div class="info-map">
					<h2>THÔNG TIN & BẢN ĐỒ</h2>
					<hr/>
					<!-- mapdat -->
						<iframe width="100%" height="500" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" :src="'https://maps.google.com/maps?q='+location.lat + ',' + location.long + '&hl=es;z=14&amp;output=embed'"></iframe><br />
					<div class="row">
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
							<div class="restaurant-more-info">
								<div class="info-label">
									Thời gian hoạt động
								</div>
								<span>{{ location.octime }}</span>
							</div>
							<div class="restaurant-more-info">
								<div class="info-label">
									Thời gian chuẩn bị
								</div>
								<span>Khoảng 5 - 10 phút</span>
							</div>
							<div class="restaurant-more-info">
								<div class="info-label">
									Sức chứa
								</div>
								<span>50 người lớn</span>
							</div>
							<div class="restaurant-more-info">
								<div class="info-label">
									Phục vụ món
								</div>
								<span>Thức uống ,  Trà sữa</span>
							</div>
						</div>
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
							<div class="restaurant-more-info">
								<div class="info-label">
									Thích hợp
								</div>
								<span>Buổi sáng , Buổi trưa , Buổi xế , Buổi tối</span>
							</div>
							<div class="restaurant-more-info">
								<div class="info-label">
									Nghỉ lễ
								</div>
								<span>Các ngày lễ trong năm</span>
							</div>
							<div class="restaurant-more-info">
								<div class="info-label">
									Phong cách ẩm thực
								</div>
								<span>Châu Á, Đài Loan </span>
							</div>
							<div class="restaurant-more-info">
								<div class="info-label">
									Website
								</div>
								<a><span>www.facebook.com/{{ location.name }}</span></a>
							</div>
						</div>
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
							<div class="restaurant-more-info">
								<div class="info-label">
									Giờ nhận khách cuối
								</div>
								<span>09:30 PM</span>
							</div>
							<div class="restaurant-more-info">
								<div class="info-label">
									Thể loại
								</div>
								<span>{{ location.type }}</span>
							</div>
							<div class="restaurant-more-info">
								<div class="info-label">
									Phù hợp với
								</div>
								<span>Hẹn hò, Họp nhóm, Giao tận nơi, Ăn vặt, Mang về</span>
							</div>
						</div>
					</div>
				</div>
				<div class="row images">
					<h2>ALBUM ẢNH</h2>
					<hr/>
					<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 special">
						<div class="wow fadeInDown animated" data-wow-duration="1s" data-wow-delay="0.6s"
							style="visibility: visible; animation-duration: 1000ms; animation-delay: 600ms; animation-name: fadeInDown;">
							<div class="list">
								<div class="item">
									<div class="image">
										<img src="/public/img/toco1.jpg">
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 special">
						<div class="wow fadeInDown animated" data-wow-duration="1s" data-wow-delay="0.6s"
							style="visibility: visible; animation-duration: 1000ms; animation-delay: 600ms; animation-name: fadeInDown;">
							<div class="list">
								<div class="item">
									<div class="image">
										<img src="/public/img/toco11.jpg">
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 special">
						<div class="wow fadeInDown animated" data-wow-duration="1s" data-wow-delay="0.6s"
							style="visibility: visible; animation-duration: 1000ms; animation-delay: 600ms; animation-name: fadeInDown;">
							<div class="list">
								<div class="item">
									<div class="image">
										<img src="/public/img/toco6.jpg">
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 special">
						<div class="wow fadeInDown animated" data-wow-duration="1s" data-wow-delay="0.6s"
							style="visibility: visible; animation-duration: 1000ms; animation-delay: 600ms; animation-name: fadeInDown;">
							<div class="list">
								<div class="item">
									<div class="image">
										<img src="/public/img/toco7.jpg">
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 special">
						<div class="wow fadeInDown animated" data-wow-duration="1s" data-wow-delay="0.6s"
							style="visibility: visible; animation-duration: 1000ms; animation-delay: 600ms; animation-name: fadeInDown;">
							<div class="list">
								<div class="item">
									<div class="image">
										<img src="/public/img/toco2.jpg">
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 special">
						<div class="wow fadeInDown animated" data-wow-duration="1s" data-wow-delay="0.6s"
							style="visibility: visible; animation-duration: 1000ms; animation-delay: 600ms; animation-name: fadeInDown;">
							<div class="list">
								<div class="item">
									<div class="image">
										<img src="/public/img/toco3.jpg">
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 special">
						<div class="wow fadeInDown animated" data-wow-duration="1s" data-wow-delay="0.6s"
							style="visibility: visible; animation-duration: 1000ms; animation-delay: 600ms; animation-name: fadeInDown;">
							<div class="list">
								<div class="item">
									<div class="image">
										<img src="/public/img/toco4.jpg">
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 special">
						<div class="wow fadeInDown animated" data-wow-duration="1s" data-wow-delay="0.6s"
							style="visibility: visible; animation-duration: 1000ms; animation-delay: 600ms; animation-name: fadeInDown;">
							<div class="list">
								<div class="item">
									<div class="image">
										<img src="/public/img/toco5.jpg">
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 special">
						<div class="wow fadeInDown animated" data-wow-duration="1s" data-wow-delay="0.6s"
							style="visibility: visible; animation-duration: 1000ms; animation-delay: 600ms; animation-name: fadeInDown;">
							<div class="list">
								<div class="item">
									<div class="image">
										<img src="/public/img/toco9.jpg">
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 special">
						<div class="wow fadeInDown animated" data-wow-duration="1s" data-wow-delay="0.6s"
							style="visibility: visible; animation-duration: 1000ms; animation-delay: 600ms; animation-name: fadeInDown;">
							<div class="list">
								<div class="item">
									<div class="image">
										<img src="/public/img/toco8.jpg">
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 special">
						<div class="wow fadeInDown animated" data-wow-duration="1s" data-wow-delay="0.6s"
							style="visibility: visible; animation-duration: 1000ms; animation-delay: 600ms; animation-name: fadeInDown;">
							<div class="list">
								<div class="item">
									<div class="image">
										<img src="/public/img/toco10.jpg">
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 special">
						<div class="wow fadeInDown animated" data-wow-duration="1s" data-wow-delay="0.6s"
							style="visibility: visible; animation-duration: 1000ms; animation-delay: 600ms; animation-name: fadeInDown;">
							<div class="list">
								<div class="item">
									<div class="image">
										<img src="/public/img/toco12.jpeg">
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row comment">
					<h2>BÌNH LUẬN CỦA CỘNG ĐỒNG <span>3</span></h2>
					<hr/>
					<div class="cmt">
						<div class="col-xs-12 col-sm-12 col-lg-12 col-md-12">
							<div class="col-xs-3 col-sm-2 col-md-1">
								<div class="user">
									<div class="avatar">
										<img src="/public/img/mod2.jpg" alt="mod" title="sonlazio">
									</div>
								</div>
							</div>
							<div class="col-xs-9 col-sm-10 col-md-11">
								<div class="cmtUser">
									<h4>sonlazio</h4>
									<div class="info">
										<p>Posted on April 10, 2017 via android <i class="fa fa-android"></i></p>
									</div>
									<p>Thực sự mình rất hay đi uống trà sữa nhưng đây là lần đầu tiên mình thấy
										thoải
										mái thật sự khi uống tại TocoToco. Đồ uống đậm vị, trà thơm đặc biệt trân
										châu TocoToco rất ngon và dai không bị nát mềm như mấy quán ts mình uống
										trước
										đây. NV thì tư vấn nhiệt tình. Sẽ gim lại địa chỉ của các bạn để ủng hộ dài
										dài
										luôn.
									</p>
									<span><i class="fa fa-heart"></i> Thích</span>
									<span><i class="fa fa-exclamation-circle"></i> Báo lỗi</span>
									<span><i class="fa fa-reply"></i> Thảo luận</span>
								</div>
							</div>
							<div class="col-xs-3 col-sm-2 col-md-1">
								<div class="user">
									<div class="avatar">
										<img src="/public/img/mod1.jpg" alt="mod" title="cuhiep">
									</div>
								</div>
							</div>
							<div class="col-xs-9 col-sm-10 col-md-11">
								<div class="cmtUser">
									<h4>cuhiep</h4>
									<div class="info">
										<p>Posted on April 10, 2017 via iOS <i class="fa fa-apple"></i></p>
									</div>
									<p>Đồ uống thì cũng tạm được. Mình uống bạc hà ở đây 1 lần vì có 1 lần order bạc
										hà
										bên Ding nhưng k có (k nhớ là k có hay là hết) và mê luôn, nhưng chỉ bạc hà
										thôi, còn các vị khác thì theo mình là không nổi bật lắm. Tầng 1 thì khá
										chật vì
										diện tích nhỏ mà quầy order đã lớn lắm rồi, chỉ có khách chờ mang đi mới
										ngồi
										thôi chứ ngồi đó thì phá phong cảnh chết. Tầng 2 thì view k đẹp (do công
										trường
										đường sắt) và khá ồn vì mọi người ngồi đây khá đông. Tầng 3 thì yên tĩnh hơn
										và
										có sàn gỗ có thể nghỉ ngơi, nằm ra được và mở được cưar sổ nhìn vào khu dân
										cư.
										Nhân viên đông và cũng nhiệt tình. Giá cả thì theo mình hơi chát :D
									</p>
									<div class="album-user" style="margin-left: -6px; margin-right: 6px">
										<div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">
											<img src="/public/img/cmt4.jpg" class="img-responsive">
										</div>
										<div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">
											<img src="/public/img/cmt3.jpg" class="img-responsive">
										</div>
										<div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">
											<img src="/public/img/cmt2.jpg" class="img-responsive">
										</div>
										<div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">
											<img src="/public/img/cmt1.jpg" class="img-responsive">
										</div>
									</div>
									<span><i class="fa fa-heart"></i> Thích</span>
									<span><i class="fa fa-exclamation-circle"></i> Báo lỗi</span>
									<span><i class="fa fa-reply"></i> Thảo luận</span>
								</div>
							</div>
							<div class="col-xs-3 col-sm-2 col-md-1">
								<div class="user">
									<div class="avatar">
										<img src="/public/img/mod3.jpg" alt="mod" title="Duy Luân">
									</div>
								</div>
							</div>
							<div class="col-xs-9 col-sm-10 col-md-11">
								<div class="cmtUser">
									<h4>Duy Luân</h4>
									<div class="info">
										<p>Posted on April 10, 2017 via windowphone <i class="fa fa-windows"></i>
										</p>
									</div>
									<p>Chắc mình ko có duyên với mấy quán quanh quanh khu này.
										quán này rất gần đh thương mại. nhưng lần nào mình đến nơi cũng ko còn chỗ
										để
										xe, cứ phải ngậm ngùi mà đi quán khác :((
									</p>
									<span><i class="fa fa-heart"></i> Thích</span>
									<span><i class="fa fa-exclamation-circle"></i> Báo lỗi</span>
									<span><i class="fa fa-reply"></i> Thảo luận</span>
								</div>
							</div>
							<div class="col-xs-3 col-sm-2 col-md-1">
								<div class="user">
									<div class="avatar">
										<img src="/public/img/mod6.jpg" alt="mod" title="Non@me">
									</div>
								</div>
							</div>
							<div class="col-xs-9 col-sm-10 col-md-11">
								<div class="cmtUser">
									<input type="text" name="" id="" placeholder="Ý kiến của bạn">
								</div>
							</div>
						</div>
					</div>
				</div>
				<hr/>
				<span>Page 1 of 1 </span>
				<hr/>
				<div class="row other">
					<h2>CÓ THỂ BẠN QUAN TÂM</h2>
					<div class="other-detail col-xs-12 col-sm-6 col-md-3 col-lg-3">
						<a href="#"><img class="width-img-100" src="/public/img/other1.jpg"></a>
						<div class="description">
							<a href="#">
								<h4>Trà Sữa Bobapop - Hồ Tùng Mậu</h4>
							</a>
							<p>6 Hồ Tùng Mậu, P.Mai Dịch, Quận Cầu Giấy, Hà Nội</p>
						</div>
					</div>
					<div class="other-detail col-xs-12 col-sm-6 col-md-3 col-lg-3">
						<a href=""><img class="width-img-100" src="/public/img/other2.jpg"></a>
						<div class="description">
							<a href="">
								<h4>Ding Tea - Hồ Tùng Mậu</h4>
							</a>
							<p>114 Hồ Tùng Mậu, Quận Cầu Giấy, Hà Nội</p>
						</div>
					</div>
					<div class="other-detail col-xs-12 col-sm-6 col-md-3 col-lg-3">
						<a href=""><img class="width-img-100" src="/public/img/other3.jpg"></a>
						<div class="description">
							<a href="">
								<h4>Trà Sữa Feeling Tea - Hồ Tùng Mậu</h4>
							</a>
							<p>112 Hồ Tùng Mậu, Quận Cầu Giấy, Hà Nội</p>
						</div>
					</div>
					<div class="other-detail col-xs-12 col-sm-6 col-md-3 col-lg-3">
						<a href=""><img class="width-img-100" src="/public/img/other4.jpg"></a>
						<div class="description">
							<a href="">
								<h4>Gongcha Hongkong</h4>
							</a>
							<p>19 Trần Quốc Hoàn, Quận Cầu Giấy, Hà Nội</p>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- LOGIN MODAL -->
		<!--    <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bs-example-modal-lg">Large modal</button> -->
		<div class="login">
			<login></login>
		</div>
		<!--footer-->
		<div class="footer">
			<myfooter></myfooter>
		</div>
		<!--<footer class="container-fluid footer">-->
		<!--<span>©TungSeven. Số 14, ngõ 4, Nguyễn Đình Chiểu, quận Hai Bà Trưng, Hà nội, Việt nam.</span>-->
		<!--</footer>-->
		<span class="waves-effect" id="btn-to-top">
		<i class="fa fa-angle-double-up" aria-hidden="true"></i>
		</span>
	</div>
</template>
<script>
    // Vue
	//import {load, Map, Marker} from 'vue-google-maps'

	//load('AIzaSyDKgeNCiN_GRLIJ9i7rTej65QloBOepets','3.24')

   export default {
        data() {
            return {
                location: {},
                errorMsg: ''
            }
        }
    }
</script>
