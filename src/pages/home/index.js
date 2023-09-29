import InputText from "../../components/inputText";

function Home() {
    return (
        <div>
            <h1>
                Home em construção!!!
            </h1>
            <InputText
                id="1"
                type="text"
                placeholder="Exemplo1"
                text="Exemplo1"
                callback={(e) => console.log(e.target.value)}
            />

            <InputText
                id="2"
                type="password"
                placeholder="Exemplo2"
                text="Exemplo2"
                callback={(e) => console.log(e.target.value)}
            />

            <InputText
                id="3"
                type="checkbox"
                placeholder="Exemplo1"
                texte="Exemplo1"
                callback={(e) => console.log(e.target.value)}
            />
        </div>
    )
}

export default Home;