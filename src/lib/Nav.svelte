<nav>
    <ul>
        <li><a class="nav-link" href="/">
            <img src="../images/Starbucks.png" class="nav-logo" alt="Starbucks">
        </a></li>
        <li><a class="nav-link" href="/">Home</a></li>
        <li><a class="nav-link" href="/testChart">Drankjes</a></li>
    </ul>
</nav>

<style>
    nav {
        display: flex;
        margin: 0;
        background-color: transparent;
        padding-left: 40px;
    }

    nav ul {
        display: flex;
        align-items: center;
        gap: 40px;
        flex: 1 0 100%;
        max-width: 100%;
        padding: 0;
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

    .active {
        color: red;
    }
</style>