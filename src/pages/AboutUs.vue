<script>
export default {
  name: 'AboutUs',
}
</script>

<template>
  <BContainer>
      <h1 class="aboutUsHeadline"> About Us </h1>
      <p class="text">
        We are sugar health. We are designed to help yout track your daily sugar intake.
        And you don't have to do it alone. Sugar health is here to help you connect with friends and family.
        Connections can help you to keep up with your more restrictive diet.
      </p>
      <BAccordion flush>
        <BAccordionItem title="Why should I track my sugar intake?">
          A lot of the time we aren't aware of how much sugar we consume every day.
          Especially hidden sugar is a real danger for obesity, tooth decay or diabetes.
          Most adults eat about 95 gramms of sugar a day. The World health organisation (WHO) recommends only 25 gramms
          per
          day for an adult.
          The National health services in england (NHS) recommends no more than 19 gramms for children between the ages
          of 4-6
          years.
        </BAccordionItem>
        <BAccordionItem title="What is hidden sugar?">
          Hidden sugar is the kind of sugar that you aren't aware of.
          It is known to most, that fruit contains sugar, or that cake has sugar in it.
          But even frozen pizza, bread or ketchup contains sugar.
          We are here to help you keep track of all this sugar, hidden or otherwise.
        </BAccordionItem>
        <BAccordionItem title="I don't want to track it alone.">
          You don't have to. You can have two profiles per account in our free version and even more in our premium
          version.
          Therefore you can keep track of yourself, your partner and your kids.
          You can also follow your friends and other users and see how well they are doing.
          With friends and family the tracking becomes easier and you can get healty together.
        </BAccordionItem>
      </BAccordion>
  </BContainer>
</template>


<style>
p {
  text-align: center;
  padding: 2vh 2vw
}

h1 {
  padding: 1vh 2vw;
  font-weight: bold;
}
</style>