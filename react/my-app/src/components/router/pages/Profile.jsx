const Profile = () => {
    return(
        <>
            <h1>Profile</h1>
            <div>
                <Link to="/profile/1?page=1&limit=10" >Francesco</Link>
                <Link to="/profile/2?page=2&limit=20" >Alessio</Link>
                <Link to="/profile/3?page=3&limit=30" >Raffaele</Link>
            </div>
        </>
    )
}

export default Profile