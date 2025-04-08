const nonMembers = document.querySelector('#nonMembers');
const mydialog = document.querySelector('#mydialog');
const closeButton = document.querySelector("#closeButton");
const mydialogText = document.querySelector('#mydialog div');
document.getElementById("timestamp").value = new Date().toLocaleString('en-US', {
    dateStyle: 'long',
    timeStyle: 'short'
});

nonMembers.addEventListener("click", () => {
    mydialog.showModal();
    mydialogText.innerHTML = `
    <h3>Non Payment Free Membership🟢</h3>
    <p><strong>Who is it for?</strong> Small businesses, startups, or entrepreneurs looking to explore the chamber's offerings before committing to a paid plan</p>
    <h4>Benefits:</h4>
    <ul>
    <li>Inclusing in online business directory (basic listing)</li>
    <li>Access to monthly newsletters and updates</li>
    <li>Invitation to community events (limited access)</li>
    <li>Networking opportunities with other members</li>
    </ul>
    <h4>Monthly Price - $0(Free)</h4>`
});

bronzeMembers.addEventListener("click", () => {
    mydialog.showModal();
    mydialogText.innerHTML = `
    <h3>Bronze Membership (Entry-Level Business Support)🥉</h3>
    <p><strong>Who is it for?</strong> Small and growing businesses looking to increase visibility and participate in more networking opportunities.</p>
    <h4>Benefits:</h4>
    <ul>
    <li>Everything in Free Plan, plus:</li>
    <li>Enhanced business directory listing (with logo and contact details)</li>
    <li>Access to select business workshops & training</li>
    <li>Discounts on event participation</li>
    <li>Opportunity to submit guest articles to our blog/newsletter</li>
    </ul>
    <h4>Monthly Price - $25</h4>`
});

silverMembers.addEventListener("click", () => {
    mydialog.showModal();
    mydialogText.innerHTML = `
    <h3>Silver Membership (Growth-Oriented Businesses)🥈</h3>
    <p><strong>Who is it for?</strong> Businesses that want to expand their market reach and benefit from more promotional opportunities.</p>
    <h4>Benefits:</h4>
    <ul>
    <li>Everything in Bronze Membership, plus:</li>
    <li>Spolight advertisement on our website (randomly featured)</li>
    <li>Social media shout-outs and promotions</li>
    <li>Priority access to networking events and business expos</li>
    <li>Member-to-member discount programs</li>
    <li>Special sponsorship opportunities for chamber events</li>
    </ul>
    <h4>Monthly Price - $50</h4>`
});

goldMembers.addEventListener("click", () => {
    mydialog.showModal();
    mydialogText.innerHTML = `
    <h3>Gold Membership(Premium Business Partnership)🥇</h3>
    <p><strong>Who is it for?</strong> Established businesses looking for maximum exposure, netowrking, and leadership opportunities within the chamber.</p>
    <h4>Benefits:</h4>
    <ul>
    <li>Everything in Silver Membership, plus:</li>
    <li>VIP placement in the business directory (featured at the top)</li>
    <li>Exclusive sponsorship and partnership opportunities</li>
    <li>Guest speaking opportunities at chamber events</li>
    <li>Personal business consultation sessions</li>
    <li>First access to busienss grants and funding opportunities</li>
    <li>Featured as a Gold Sponser in chamber publications and media</li>
    </ul>
    <h4>Monthly Price - $100</h4>`
});

closeButton.addEventListener("click", () => {
    mydialog.close();
})