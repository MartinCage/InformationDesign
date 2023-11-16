<nav>
    <ul>
        <li><a class="nav-link" href="/">
            <img src="../images/Starbucks.png" class="nav-logo" alt="Starbucks">
        </a></li>
        <li><a class="nav-link" href="/">Home</a></li>
        <li><a class="nav-link" href="/testChart">Drankjes</a></li>
    </ul>
    <div class="page-title">
        <h1>Our Ingrediënts</h1>
    </div>
</nav>

<style>
    nav {
        display: flex;
        margin: 0;
        background-color: transparent;
    }

    nav ul {
        display: flex;
        align-items: center;
        gap: 40px;
        flex: 1 0 50%;
        max-width: 50%;
        padding: 0;
        margin: 50px 0;
    }

    nav ul li {
        list-style-type: none;
    }

    nav ul li a {
        text-decoration: none;
        text-transform: uppercase;
        font-size: 14px;
        letter-spacing: 3px;
        color: black;
    }

    .nav-logo {
        width: 100px;
    }

    .page-title {
        display: flex;
        flex: 1 0 50%;
        max-width: 50%;
        align-items: center;
        justify-content: flex-end;
    }

    .page-title h1 {
        font-size: 60px;
        color: #01754A;
    }

    .active {
        color: red;
    }
</style>