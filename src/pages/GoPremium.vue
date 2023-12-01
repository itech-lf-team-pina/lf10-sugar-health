<script>
export default {
    name: 'GoPremium',
}
</script>

<template>
    <h1>Premium</h1>
    <p> Here is what you get for premium:</p>

    <table>
        <tr>
            <th></th>
            <th>Free</th>
            <th>Premium</th>
        </tr>
        <tr>
            <td class="condition">Input your suger intake</td>
            <td><i class="fa-solid fa-check" style="color: #51b15b;"></i></td>
            <td><i class="fa-solid fa-check" style="color: #51b15b;"></i></td>
        </tr>
        <tr>
            <td class="condition">Change your profilepicture</td>
            <td><i class="fa-solid fa-check" style="color: #51b15b;"></i></td>
            <td><i class="fa-solid fa-check" style="color: #51b15b;"></i></td>
        </tr>
        <tr>
            <td class="condition">Statistic</td>
            <td><i class="fa-solid fa-check" style="color: #51b15b;"></i></td>
            <td><i class="fa-solid fa-check" style="color: #51b15b;"></i></td>
        </tr>
        <tr>
            <td class="condition">Avatar per profile</td>
            <td><i class="fa-solid fa-x" style="color: #cb1a1a;"></i></td>
            <td><i class="fa-solid fa-check" style="color: #51b15b;"></i></td>
        </tr>
        <tr>
            <td class="condition">Productsearch</td>
            <td><i class="fa-solid fa-x" style="color: #cb1a1a;"></i></td>
            <td><i class="fa-solid fa-check" style="color: #51b15b;"></i></td>
        </tr>
        <tr>
            <td class="condition">Ad free</td>
            <td><i class="fa-solid fa-x" style="color: #cb1a1a;"></i></td>
            <td><i class="fa-solid fa-check" style="color: #51b15b;"></i></td>
        </tr>
        <tr>
            <td class="condition">Expanded intake form</td>
            <td><i class="fa-solid fa-x" style="color: #cb1a1a;"></i></td>
            <td><i class="fa-solid fa-check" style="color: #51b15b;"></i></td>
        </tr>
        <tr>
            <td class="condition">More than 2 profiles per account</td>
            <td><i class="fa-solid fa-x" style="color: #cb1a1a;"></i></td>
            <td><i class="fa-solid fa-check" style="color: #51b15b;"></i></td>
        </tr>
        <tr>
            <td class="condition">Challenges</td>
            <td><i class="fa-solid fa-x" style="color: #cb1a1a;"></i></td>
            <td><i class="fa-solid fa-check" style="color: #51b15b;"></i></td>
        </tr>
        <tr>
            <td class="condition">Pick your own goals</td>
            <td><i class="fa-solid fa-x" style="color: #cb1a1a;"></i></td>
            <td><i class="fa-solid fa-check" style="color: #51b15b;"></i></td>
        </tr>
        <tr class="noBorder">
            <td></td>
            <td>Your current plan</td>
            <td> 3,99€ per month</td>
        </tr>
        <tr class="noBorder">
            <td></td>
            <td></td>
            <td><button type="button" onclick="window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ')">Go Premium</button></td>
        </tr>
    </table>
</template>

<style>
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 75%;
    margin-left: auto;
    margin-right: auto;
}

td,
th {
    border-bottom: 1px solid #dddddd;
    text-align: right;
    padding: 8px;
}

tr.noBorder td {
    border: 0;
}

.condition {
    text-align: left;
}

button {
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px;
    cursor: pointer;

}

button:hover {
    background-color: #45a049;
}
</style>
