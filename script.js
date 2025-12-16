/*
script.js
Purpose: Core logic for the AI Digital Product Generator
Contains form handling, mock AI response generation, and UI interactions
*/

// DOM Elements
const productForm = document.getElementById('productForm');
const outputPlaceholder = document.getElementById('outputPlaceholder');
const outputContent = document.getElementById('outputContent');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');

// Product type configurations
const productTypes = {
    ebook: {
        name: "EBook",
        icon: "fas fa-book",
        color: "#4b6cb7"
    },
    notion: {
        name: "Notion Template",
        icon: "fas fa-table",
        color: "#10b981"
    },
    prompt: {
        name: "Prompt Pack",
        icon: "fas fa-keyboard",
        color: "#f59e0b"
    },
    guide: {
        name: "Guide",
        icon: "fas fa-map-signs",
        color: "#8b5cf6"
    }
};

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Form submission
    productForm.addEventListener('submit', function(e) {
        e.preventDefault();
        generateProduct();
    });
    
    // Copy button
    copyBtn.addEventListener('click', copyToClipboard);
    
    // Download button
    downloadBtn.addEventListener('click', downloadContent);
    
    // Update form based on selections
    document.getElementById('productType').addEventListener('change', updateFormLabels);
});

// Update form labels based on product type
function updateFormLabels() {
    const productType = document.getElementById('productType').value;
    const lengthLabel = document.querySelector('label[for="length"]');
    
    if (productType === 'ebook') {
        lengthLabel.innerHTML = '<i class="fas fa-ruler"></i> Length (pages)';
    } else if (productType === 'notion' || productType === 'guide') {
        lengthLabel.innerHTML = '<i class="fas fa-ruler"></i> Length (sections)';
    } else if (productType === 'prompt') {
        lengthLabel.innerHTML = '<i class="fas fa-ruler"></i> Number of Prompts';
    }
}

// Main function to generate the product
function generateProduct() {
    // Get form values
    const productType = document.getElementById('productType').value;
    const topic = document.getElementById('topic').value.trim();
    const audience = document.getElementById('audience').value;
    const length = parseInt(document.getElementById('length').value);
    const detail = document.getElementById('detail').value;
    
    // Validation
    if (!productType || !topic || !audience || !detail || !length || length < 1) {
        showError('Please fill in all fields with valid values.');
        return;
    }
    
    // Show loading state
    generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    generateBtn.disabled = true;
    
    // Simulate API delay
    setTimeout(() => {
        // Create AI prompt (structured for real API integration)
        const aiPrompt = createAIPrompt(productType, topic, audience, length, detail);
        
        // Generate mock AI response (replace with real API call)
        const aiResponse = generateAIResponse(productType, topic, audience, length, detail, aiPrompt);
        
        // Display the generated product
        displayGeneratedProduct(productType, topic, audience, length, detail, aiResponse);
        
        // Reset button
        generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate Product';
        generateBtn.disabled = false;
    }, 800); // Simulate network delay
}

// Create a structured AI prompt (for real API integration)
function createAIPrompt(productType, topic, audience, length, detail) {
    const productName = productTypes[productType].name;
    
    let prompt = `Generate a ${productName} about "${topic}" for ${audience} audience. `;
    prompt += `The product should be ${length} ${getLengthUnit(productType)} long with a ${detail} level of detail. `;
    
    // Add specific instructions based on product type
    if (productType === 'ebook') {
        prompt += `Include: 1) A compelling title, 2) An introduction, 3) ${length} chapters with headings, 4) A short explanation under each chapter. `;
    } else if (productType === 'notion') {
        prompt += `Include: 1) Page structure, 2) Section names, 3) How to use the template, 4) Practical examples. `;
    } else if (productType === 'prompt') {
        prompt += `Include: 1) ${length} numbered prompts, 2) Purpose of each prompt, 3) How to use them effectively. `;
    } else if (productType === 'guide') {
        prompt += `Include: 1) Step-by-step instructions, 2) Tips and best practices, 3) Common pitfalls to avoid. `;
    }
    
    prompt += `Make the content practical, realistic, ready to use, and easy to understand.`;
    
    return prompt;
}

// Get the appropriate length unit based on product type
function getLengthUnit(productType) {
    switch(productType) {
        case 'ebook': return 'pages';
        case 'notion': return 'sections';
        case 'prompt': return 'prompts';
        case 'guide': return 'sections';
        default: return 'items';
    }
}

/*
AI INTEGRATION POINT:
Replace this function with actual API call to OpenAI, Gemini, or DeepSeek
Example for OpenAI:
async function callOpenAI(prompt) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 2000
        })
    });
    
    const data = await response.json();
    return data.choices[0].message.content;
}
*/

// Generate mock AI response (to be replaced with real API)
function generateAIResponse(productType, topic, audience, length, detail, prompt) {
    console.log("AI Prompt created:", prompt);
    console.log("In a real implementation, this would call an AI API (OpenAI, Gemini, DeepSeek)");
    
    // Generate mock content based on product type
    switch(productType) {
        case 'ebook':
            return generateMockEBook(topic, audience, length, detail);
        case 'notion':
            return generateMockNotionTemplate(topic, audience, length, detail);
        case 'prompt':
            return generateMockPromptPack(topic, audience, length, detail);
        case 'guide':
            return generateMockGuide(topic, audience, length, detail);
        default:
            return "Error: Unknown product type";
    }
}

// Mock EBook generator
function generateMockEBook(topic, audience, length, detail) {
    let content = `<h3>${topic}: A Complete Guide for ${audience.charAt(0).toUpperCase() + audience.slice(1)}s</h3>`;
    
    content += `<div class="meta-info">
        <p><strong>Product Type:</strong> EBook</p>
        <p><strong>Target Audience:</strong> ${audience}</p>
        <p><strong>Length:</strong> ${length} pages</p>
        <p><strong>Detail Level:</strong> ${detail}</p>
    </div>`;
    
    content += `<h4>Introduction</h4>
    <p>Welcome to "${topic}" - your comprehensive resource for mastering this essential topic. This ebook is specifically designed for ${audience}s, with ${detail} explanations and practical examples throughout.</p>
    <p>Whether you're just starting out or looking to deepen your understanding, this guide will provide you with the knowledge and tools you need to succeed.</p>`;
    
    content += `<h4>Table of Contents</h4><ol>`;
    for (let i = 1; i <= length; i++) {
        content += `<li>Chapter ${i}: ${getChapterTitle(topic, i)}</li>`;
    }
    content += `</ol>`;
    
    content += `<h4>Chapter Details</h4>`;
    for (let i = 1; i <= Math.min(length, 5); i++) {
        content += `<h5>Chapter ${i}: ${getChapterTitle(topic, i)}</h5>
        <p>This chapter covers the fundamentals of ${getChapterTopic(topic, i)}. You'll learn key concepts and practical applications suitable for ${audience} level. By the end of this chapter, you'll be able to apply these concepts in real-world scenarios.</p>`;
    }
    
    content += `<h4>Conclusion</h4>
    <p>This ebook has provided you with a ${detail} understanding of ${topic}. Remember that continuous practice and application of these concepts is key to mastery. Use the knowledge gained here as a foundation for further exploration and skill development.</p>`;
    
    return content;
}

// Mock Notion Template generator
function generateMockNotionTemplate(topic, audience, length, detail) {
    let content = `<h3>${topic} Notion Template</h3>`;
    
    content += `<div class="meta-info">
        <p><strong>Product Type:</strong> Notion Template</p>
        <p><strong>Target Audience:</strong> ${audience}</p>
        <p><strong>Sections:</strong> ${length}</p>
        <p><strong>Detail Level:</strong> ${detail}</p>
    </div>`;
    
    content += `<h4>Template Overview</h4>
    <p>This Notion template helps you organize and manage ${topic} effectively. Designed for ${audience}s, it provides a ${detail} structure that's both flexible and powerful.</p>`;
    
    content += `<h4>Template Structure</h4>
    <p>The template is organized into ${length} main sections:</p>
    <ul>`;
    
    for (let i = 1; i <= length; i++) {
        content += `<li><strong>Section ${i}: ${getSectionName(topic, i)}</strong> - ${getSectionDescription(topic, i, audience)}</li>`;
    }
    
    content += `</ul>`;
    
    content += `<h4>How to Use This Template</h4>
    <ol>
        <li><strong>Duplicate the template</strong> to your own Notion workspace</li>
        <li><strong>Customize each section</strong> according to your specific needs</li>
        <li><strong>Add your content</strong> in the appropriate sections</li>
        <li><strong>Use the database views</strong> to filter and sort information</li>
        <li><strong>Share with team members</strong> if collaborating on ${topic}</li>
    </ol>`;
    
    content += `<h4>Pro Tips</h4>
    <ul>
        <li>Use @ mentions to link to team members or dates</li>
        <li>Create additional database views for different perspectives</li>
        <li>Add tags to categorize items for easy filtering</li>
        <li>Embed relevant files or links directly in the template</li>
        <li>Set up automations to streamline your workflow</li>
    </ul>`;
    
    return content;
}

// Mock Prompt Pack generator
function generateMockPromptPack(topic, audience, length, detail) {
    let content = `<h3>${topic} Prompt Pack</h3>`;
    
    content += `<div class="meta-info">
        <p><strong>Product Type:</strong> Prompt Pack</p>
        <p><strong>Target Audience:</strong> ${audience}</p>
        <p><strong>Number of Prompts:</strong> ${length}</p>
        <p><strong>Detail Level:</strong> ${detail}</p>
    </div>`;
    
    content += `<h4>Introduction to This Prompt Pack</h4>
    <p>This collection of ${length} carefully crafted prompts will help you generate high-quality content about ${topic}. Each prompt is designed for ${audience} level users and includes ${detail} instructions for best results.</p>`;
    
    content += `<h4>How to Use These Prompts</h4>
    <p>1. Copy the prompt text exactly as shown<br>
    2. Paste into your preferred AI tool (ChatGPT, Claude, Gemini, etc.)<br>
    3. Modify the bracketed [parameters] with your specific information<br>
    4. Review and refine the output to match your needs</p>`;
    
    content += `<h4>Prompt Collection</h4>`;
    
    for (let i = 1; i <= length; i++) {
        content += `<h5>Prompt ${i}: ${getPromptTitle(topic, i)}</h5>
        <p><strong>Purpose:</strong> ${getPromptPurpose(topic, i, audience)}</p>
        <p><strong>The Prompt:</strong> "${getFullPrompt(topic, i, detail, audience)}"</p>
        <p><strong>Expected Output:</strong> ${getPromptOutputDescription(topic, i)}</p>`;
    }
    
    content += `<h4>Best Practices for Prompt Engineering</h4>
    <ul>
        <li>Be specific about the desired format and length</li>
        <li>Include examples when possible</li>
        <li>Specify the tone and style you want</li>
        <li>Iterate and refine based on initial results</li>
        <li>Chain prompts together for complex tasks</li>
    </ul>`;
    
    return content;
}

// Mock Guide generator
function generateMockGuide(topic, audience, length, detail) {
    let content = `<h3>Complete Guide to ${topic}</h3>`;
    
    content += `<div class="meta-info">
        <p><strong>Product Type:</strong> Guide</p>
        <p><strong>Target Audience:</strong> ${audience}</p>
        <p><strong>Sections:</strong> ${length}</p>
        <p><strong>Detail Level:</strong> ${detail}</p>
    </div>`;
    
    content += `<h4>About This Guide</h4>
    <p>This ${detail} guide provides step-by-step instructions for mastering ${topic}. Whether you're a complete beginner or looking to enhance your skills, you'll find practical advice and actionable steps here.</p>`;
    
    content += `<h4>Step-by-Step Instructions</h4>
    <ol>`;
    
    for (let i = 1; i <= length; i++) {
        content += `<li><strong>Step ${i}: ${getStepTitle(topic, i)}</strong><br>
        ${getStepDescription(topic, i, detail, audience)}
        ${i % 3 === 0 ? `<em>Pro tip: ${getProTip(topic, i)}</em><br><br>` : '<br>'}`;
    }
    
    content += `</ol>`;
    
    content += `<h4>Essential Tools & Resources</h4>
    <ul>
        <li>Primary tool for ${topic}</li>
        <li>Learning resources for ${audience}s</li>
        <li>Community forums and support</li>
        <li>Practice exercises and projects</li>
        <li>Measurement and tracking tools</li>
    </ul>`;
    
    content += `<h4>Common Mistakes to Avoid</h4>
    <ul>
        <li>${getCommonMistake(topic, 1)}</li>
        <li>${getCommonMistake(topic, 2)}</li>
        <li>${getCommonMistake(topic, 3)}</li>
        <li>${getCommonMistake(topic, 4)}</li>
    </ul>`;
    
    content += `<h4>Next Steps After This Guide</h4>
    <p>Once you've completed this guide, you should:</p>
    <ol>
        <li>Practice the skills you've learned with real examples</li>
        <li>Join a community of peers to share knowledge</li>
        <li>Explore advanced topics in ${topic}</li>
        <li>Consider certification or formal training</li>
        <li>Apply your knowledge to a real project</li>
    </ol>`;
    
    return content;
}

// Helper functions for generating mock content
function getChapterTitle(topic, chapterNum) {
    const prefixes = ["Understanding", "Mastering", "Essential", "Advanced", "Practical", "The Complete"];
    const topics = ["Fundamentals", "Techniques", "Applications", "Strategies", "Methods", "Principles"];
    return `${prefixes[chapterNum % prefixes.length]} ${topic.split(' ')[0]} ${topics[chapterNum % topics.length]}`;
}

function getChapterTopic(topic, chapterNum) {
    const aspects = ["core principles", "key techniques", "practical applications", "advanced strategies", "common challenges", "best practices"];
    return `${topic} ${aspects[chapterNum % aspects.length]}`;
}

function getSectionName(topic, sectionNum) {
    const names = ["Overview", "Planning", "Execution", "Tracking", "Review", "Resources", "Collaboration", "Archive"];
    return `${topic} ${names[sectionNum % names.length]}`;
}

function getSectionDescription(topic, sectionNum, audience) {
    const descriptions = [
        `Track progress and milestones for your ${topic} projects`,
        `Store and organize resources related to ${topic}`,
        `Document your ${topic} processes and workflows`,
        `Collaborate with team members on ${topic} initiatives`,
        `Review and analyze ${topic} performance metrics`,
        `Plan upcoming ${topic} activities and tasks`
    ];
    return descriptions[sectionNum % descriptions.length];
}

function getPromptTitle(topic, promptNum) {
    const actions = ["Generate", "Create", "Analyze", "Optimize", "Summarize", "Explain"];
    const formats = ["comprehensive guide", "detailed analysis", "step-by-step tutorial", "comparison table", "beginner's explanation", "expert review"];
    return `${actions[promptNum % actions.length]} a ${formats[promptNum % formats.length]} about ${topic}`;
}

function getPromptPurpose(topic, promptNum, audience) {
    const purposes = [
        `To generate beginner-friendly explanations of ${topic}`,
        `To create advanced analysis for experienced practitioners`,
        `To produce practical examples and case studies`,
        `To explain complex concepts in simple terms`,
        `To compare different approaches to ${topic}`,
        `To provide actionable steps for implementation`
    ];
    return purposes[promptNum % purposes.length];
}

function getFullPrompt(topic, promptNum, detail, audience) {
    return `Act as an expert in ${topic}. Create a ${detail} ${getPromptTitle(topic, promptNum).toLowerCase()} suitable for ${audience} audience. Include practical examples and actionable advice.`;
}

function getPromptOutputDescription(topic, promptNum) {
    const outputs = [
        `A well-structured document with clear headings and examples`,
        `A practical guide with step-by-step instructions`,
        `An analysis with key insights and recommendations`,
        `A comparison table highlighting differences and similarities`,
        `A tutorial with code samples or practical exercises`
    ];
    return outputs[promptNum % outputs.length];
}

function getStepTitle(topic, stepNum) {
    const actions = ["Learn the basics", "Set up your environment", "Practice core skills", "Build your first project", "Optimize your workflow", "Master advanced concepts"];
    return actions[stepNum % actions.length];
}

function getStepDescription(topic, stepNum, detail, audience) {
    return `This ${detail.toLowerCase()} step will help you ${getStepTitle(topic, stepNum).toLowerCase()} for ${topic}. Follow the instructions carefully and don't skip any parts, especially if you're an ${audience}.`;
}

function getProTip(topic, stepNum) {
    const tips = [
        `Use online resources to supplement your learning`,
        `Join a community to get feedback on your progress`,
        `Document your journey to track improvement`,
        `Practice consistently rather than in long bursts`,
        `Teach someone else to solidify your understanding`
    ];
    return tips[stepNum % tips.length];
}

function getCommonMistake(topic, mistakeNum) {
    const mistakes = [
        `Skipping fundamentals to get to advanced topics faster`,
        `Not practicing enough with real-world examples`,
        `Trying to learn everything at once without focus`,
        `Not seeking help when encountering difficulties`,
        `Comparing your progress to others instead of focusing on your own journey`
    ];
    return mistakes[mistakeNum % mistakes.length];
}

// Display the generated product
function displayGeneratedProduct(productType, topic, audience, length, detail, content) {
    // Hide placeholder, show content
    outputPlaceholder.style.display = 'none';
    outputContent.style.display = 'block';
    
    // Add generated content
    outputContent.innerHTML = `<div class="generated-content fade-in">${content}</div>`;
    
    // Add product type badge
    const productConfig = productTypes[productType];
    const badge = `<div style="background-color: ${productConfig.color}" class="product-badge">
        <i class="${productConfig.icon}"></i> ${productConfig.name}
    </div>`;
    
    outputContent.querySelector('.generated-content').insertAdjacentHTML('afterbegin', badge);
    
    // Scroll to output
    outputContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Copy content to clipboard
function copyToClipboard() {
    if (!outputContent.innerHTML || outputContent.style.display === 'none') {
        showError('No content to copy. Please generate a product first.');
        return;
    }
    
    // Extract text from HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = outputContent.querySelector('.generated-content').innerHTML;
    const textToCopy = tempDiv.textContent || tempDiv.innerText || '';
    
    // Use Clipboard API
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            // Show success feedback
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyBtn.style.backgroundColor = '#10b981';
            copyBtn.style.color = 'white';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.style.backgroundColor = '';
                copyBtn.style.color = '';
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
            showError('Failed to copy to clipboard. Please try again.');
        });
}

// Download content as text file
function downloadContent() {
    if (!outputContent.innerHTML || outputContent.style.display === 'none') {
        showError('No content to download. Please generate a product first.');
        return;
    }
    
    // Extract text from HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = outputContent.querySelector('.generated-content').innerHTML;
    const textToDownload = tempDiv.textContent || tempDiv.innerText || '';
    
    // Create download link
    const productType = document.getElementById('productType').value;
    const topic = document.getElementById('topic').value.trim().replace(/\s+/g, '_');
    const filename = `${productType}_${topic}_${new Date().getTime()}.txt`;
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textToDownload));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// Show error message
function showError(message) {
    // Remove existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    // Create new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message fade-in';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    
    // Insert after form header
    const formHeader = document.querySelector('.form-header');
    formHeader.parentNode.insertBefore(errorDiv, formHeader.nextSibling);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) errorDiv.remove();
    }, 5000);
}

// Add CSS for product badge
const style = document.createElement('style');
style.textContent = `
    .product-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-weight: 600;
        margin-bottom: 15px;
        font-size: 0.9rem;
    }
    
    .generated-content {
        position: relative;
    }
`;
document.head.appendChild(style);