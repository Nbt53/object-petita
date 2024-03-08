import ViewTitle from "../components/ViewTitle";

export default function About() {

    return (
        <section className="screen-container">
            <ViewTitle title="About the artist" />
            <div className="about-container">
                <img src="./images/about.png" alt="" className="about-img" />

                <div className="about-text-container">
                    <p className="about-text mb-small">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi non
                        laudantium cumque enim. Quibusdam nisi enim consequuntur perspiciatis obcaecati minima,
                        hic libero ab praesentium sunt, illum id eum nihil facilis!    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi non
                        laudantium cumque enim. Quibusdam nisi enim consequuntur perspiciatis obcaecati minima,
                        hic libero ab praesentium sunt, illum id eum nihil facilis!
                    </p>
                    <p className="about-text mb-small">
                        Blanditiis quod optio dolore modi ea molestiae quae dicta consectetur eum
                        corrupti dolorem aliquid, nisi sed magni voluptatum sapiente illo maxime reprehenderit.
                        Aspernatur fugiat a at, animi possimus tenetur repudiandae?    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi non
                        laudantium cumque enim. Quibusdam nisi enim consequuntur perspiciatis obcaecati minima,
                        hic libero ab praesentium sunt, illum id eum nihil facilis!
                    </p>
                    <p className="about-text">
                        At eius voluptate est, sunt deserunt corporis? Dicta cumque enim sapiente illo autem
                        repudiandae. Obcaecati, repellat voluptates maiores ab quaerat mollitia ipsa, aliquam hic,
                        corrupti dolorum rem id delectus tempore.
                    </p>

                    <ul className="about-list">
                        <li className="about-list-item mb-small">Big Bird Art fair 2022</li>
                        <li className="about-list-item mb-small">Beakfest 2023</li>
                        <li className="about-list-item mb-small">Dark Pottery 2023</li>
                        <li className="about-list-item mb-small">Ceribal Ceramics 2024</li>
                    </ul>

                </div>
            </div>


        </section>
    )
}