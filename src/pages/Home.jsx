import profile from '../assets/img/me.jpg';

const Home = () => {

    return (
        <div style={{ border: '1px solid lightgray', borderRadius: '0.5rem', padding: '0.5rem', margin: '20px', textAlign: 'center' }}>
            <div className="my-3">
                <img
                    src={profile}
                    alt="Profile"
                    className="rounded-circle"
                    style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                />
            </div>


            <div className="text-center m-3 fs-4">
                <p className="mb-0">
                    ชื่อ : เมธวิน
                </p>
                                <p className="mb-0">
                    นามสกุล : ปิติสกุลรัตน์
                </p>
                <p className="mb-0">
                    รหัสนักศึกษา : 67151964
                </p>
                <p className="mb-0">
                    คณะเทคโนโลยีสารสนเทศ <br />
                    สาขาวิชาวิทยาการคอมพิวเตอร์และนวัตกรรมการพัฒนาซอฟต์แวร์
                </p>
                <p className="mb-0">
                    มหาวิทยาลัยศรีปทุม
                </p>
            </div>
        </div>
    );
}

export default Home;