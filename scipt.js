// JavaScript for Dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.querySelector('.dropdown');

    dropdown.addEventListener('mouseover', function() {
        this.querySelector('.dropdown-content').style.display = 'block';
    });

    dropdown.addEventListener('mouseout', function() {
        this.querySelector('.dropdown-content').style.display = 'none';
    });
});