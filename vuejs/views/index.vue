<template>
	<div id="myhome">
		<myheader :search="search"></myheader>
		<section class="container-fluid tab">
			<div class="container mieuta">
				<div class="container" id="second-menu">
					<div class="row">
						<div class="col-sm-2 col-xs-12 submit" hidden="hidden">
							<form action="/find/loc" method="post" id="nearForm">
								<input id="inLat" name="inLat">
								<input id="inLong" name="inLong">
								<input id="inType" name="inType">
								<input id="inR" name="inR">
							</form>
							<form action="/find/dist" method="post" id="distForm">
								<input id="inDist" name="inDist">
								<input id="inType2" name="inType2">
							</form>
						</div>
						<div class="col-sm-2 col-xs-12 district">
							<select name="district" class="select" id="district" v-on:change="findDist()">
								<option style="display: none">- Quận/Huyện -</option>
								<option value="1">Quận Hà Đông</option>
								<option value="2">Quận Hai Bà Trưng</option>
								<option value="3">Quận Hoàn Kiếm</option>
								<option value="4">Quận Ba Đình</option>
								<option value="5">Quận Thanh Xuân</option>
								<option value="6">Quận Đống Đa</option>
								<option value="7">Quận Cầu Giấy</option>
								<option value="8">Quận Tây Hồ</option>
								<option value="9">Quận Gia Lâm</option>
								<option value="10">Quận Hoàng Mai</option>
								<option value="11">Quận Nam Từ Liêm</option>
								<option value="12">Quận Bắc Từ Liêm</option>
								<option value="13">Quận Long Biên</option>
							</select>
						</div>
						<div class="col-sm-2 col-xs-12 type">
							<select name="type" class="select" id="type">
								<option style="display: none">- Thể loại -</option>
								<option value="1">Restaurant</option>
								<option value="2" selected="selected">Café/Dessert</option>
							</select>
						</div>
						<div class="col-sm-2 col-xs-12 radius">
							<select name="r" class="select" id="r" v-on:change="findNear()" >
								<option style="display: none">- Khoảng cách -</option>
								<option value="200">200m</option>
								<option value="500">500m</option>
								<option value="1000">1 km</option>
								<option value="2000">2 km</option>
								<option value="5000">5 km</option>
							</select>
						</div>
						<div class="col-sm-2 col-xs-12 submit" hidden="hidden">
							<input type="button" onclick="nearFunction()" value="FIND NEAR">
							<input type="button" onclick="distFunction()" value="FIND DIST">
						</div>
						<!--</form>-->
					</div>
				</div>
				<div class="container">
					<div class="row" v-if="locations">
						<div v-for="location in locations" class="col-xs-12 col-sm-6 col-md-4 col-lg-4 special">
							<div class="list">
								<div class="item">
									<div class="image">
										<img :src="location.image">
										<div class="image-overlay">
											<a :href="'/detail/' + location.id_location"><span>Xem Chi Tiết</span></a>
											<!--<a href="detail.html"><span>Đạt hàng</span></a>-->
										</div>
									</div>
									<div class="description">
										<span>{{ location.rate }}</span>
										<a :href="'/detail/' + location.id_location">
											<h3>{{ location.name }}</h3>
										</a>
										<p>{{ location.address }}, {{ location.district }}, Hà Nội</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div v-else class="row">{{errorMsg}}</div>
				</div>
			</div>
		</section>
		<login></login>
		<myfooter></myfooter>
	</div>
</template>
<script>
    // Vue
    export default {
        data() {
            return {
                locations: [],
                errorMsg: ''
            }
        },
        methods: {
            findNear() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        let lat = position.coords.latitude;
                        let long = position.coords.longitude;

                        axios.post('/find/loc', {
                            inLong: long,
                            inLat: lat,
                            inType: $("#type").val(),
                            inR: $("#r").val()
                        })
                        .then(response => {
                            this.locations = response.data;
                        })
                        .catch(error => {
                            this.locations = [];
                        }); 
                    });
                }
            },
            findDist() {
                axios.post('/find/dist', {
                        inType: $("#type").val(),
                        inDist: $("#district").val()
                    })
                    .then(response => {
                        this.locations = response.data;
                    })
                    .catch(error => {
                        this.locations = [];
                    });;
            },
			search() {
				let term = document.getElementById("searchInput").value;
				let api = `/search?term=${term}`;
				axios.get(api).then(response => {
					this.locations = response.data
				}).catch(error => {
					this.errorMsg = 'No user or no location'
					this.data = []
				})
			}
        }
    }
</script>