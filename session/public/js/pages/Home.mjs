export const Home = (props = { root, onChangeUI }) => {
    props.root.innerHTML = `
    <div class="w-screen h-screen flex justify-center items-center flex-col" id="profile-page">
        <h1>Home</h1>
    </div>
    `
}