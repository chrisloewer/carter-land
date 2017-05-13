---
title: Contact
cache_enable: false
contentClass: 'center'
form:
    name: contact-form
    classes: contact-form
    fields:
        - name: email
          label: Email
          placeholder: Enter your email address
          type: text
          validate:
            rule: email
            required: true
        - name: subject
          label: Subject
          placeholder: What can we help you with?
          autocomplete: on
          type: text
          validate:
            required: true
        - name: message
          label: Message
          size: long
          placeholder: Enter your message
          type: textarea
          validate:
            required: true
    buttons:
        - type: submit
          value: Submit
    process:
        - email:
            from: "{{ config.plugins.email.from }}"
            to:
              - "{{ config.plugins.email.from }}"
              - "{{ form.value.email }}"
            subject: "{{ form.value.subject|e }}"
            body: "{% include 'forms/data.html.twig' %}"
        - save:
            fileprefix: feedback-
            dateformat: Ymd-His-u
            extension: txt
            body: "{% include 'forms/data.txt.twig' %}"
        - message: Thank you for your feedback!
        - display: messagesent
---

## Drop Us a Line

Whether you are looking to buy or sell, we would love to hear from you.
