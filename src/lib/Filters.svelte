<section>
    <div class="button-holder">
        <button>Filter 1</button>
        <button>Filter 2</button>
        <button>Filter 3</button>
        <button>Filter 4</button>
    </div>
</section>

<style>

    section {
        padding-bottom: 25px;
    }
    .button-holder {
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 40px;
    }

    .button-holder button {
        padding: 15px 25px;
        border-radius: 15px;
        border: none;
        background-color: #e9e9e9;
        text-transform: uppercase;
        letter-spacing: 3px;
        font-weight: 600;
        transition: all .3s ease-in-out;
    }

    .button-holder button:hover {
        cursor: pointer;
        background-color: #01754A;
        color: white;
    }
</style>